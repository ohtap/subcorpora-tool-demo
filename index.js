const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
var fs = require('fs');
var axios = require('axios');

/*** INITIALIZATION AND APPLICATION STARTUP ***/

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Data files for session
const dataFile = './data/session.json';
var data = {};

// Current data for current run
var currRun = {
	id: 'test-05202019041500',
	name: '',
	date: '',
	collections: [],
	metadata: "./data/metadata.csv",
	keywordList: [],
	total: 0 // Progress of the run
};

// Current displays
var currDisplay = {
	summary: true,
	runId: 'test-05202019041500',
	individualId: 'BWOH-rape-3'
};

/*
 * Initializes the data into the session by reading in the current collections
 * located in data/corpus-files. It also reads in the data located in the data
 * file and keeps that in backend memory.
 */
 function initializeData() {
 	console.log("Initializing data from session.json...")
 	var rawData = fs.readFileSync(dataFile);
 	data = JSON.parse(rawData);

 	// Reads in current collections located in data/corpus-files
 	let collections = fs.readdirSync('./data/corpus-files').filter(function (file) {
		return fs.statSync('./data/corpus-files/' + file).isDirectory();
	});

	// Deletes any collections in the data JSON structure that don't appear
	// within our folder and prints a warning message.
	var remove = [];
	for (var c in data['collections']) {
		if (!collections.includes(c)) {
			remove.push(c);
		}
	}
	for (var i in remove) {
		delete data[remove[i]];
		console.log('WARNING: ' + remove[i] + ' collection doesn\'t exist in data/corpus-files. Please either add the files or delete the entry from session.json.');
	}

	console.log("Initialized data:");
	console.log(JSON.stringify(data) + '\n');
 }

// Serves the session
const port = process.env.PORT || 5000;
app.listen(port, function() {
	// Creates a session JSON file if one does not exist and writes to it
	const rawContents = `{ 
		'keyword-lists': {},
		'collections': {},
		'runs': {}
	}`;

	if (!fs.existsSync(dataFile)) {
		fs.writeFile(dataFile, rawContents, { flag: 'wx' }, function (err) {
		    if (err) throw err;
		});
		initializeData();
	} else {
		initializeData();
	}
});
console.log(`OHTAP Subcorpora Tool launched at localhost:${port}\n`);

/** FUNCTIONS FOR UPDATING SESSION.JSON **/

// Writes to the session.json file
function saveToSessionFile() {
	fs.writeFile(dataFile, JSON.stringify(data), function (err) {
		if (err) {
			console.log("ERROR: could not save to session.json (" + err + ")");
		}
	});
}

// Adds a new collection into the data
function addCollection(_id, name, shortened_name, collection_count, description, themes, notes) {
	var newCollection = {
		"id": _id,
		"name": name,
		"shortened-name": shortened_name,
		"collection-count": collection_count,
		"description": description,
		"themes": themes,
		"notes": notes
	};

	data["collections"][_id] = newCollection;
}

// Adds a new keyword list itno the data
function addKeywordList(_id, name, version, date_added, include, exclude) {
	var newKeywordList = {
		"id": _id,
		"name": name,
		"version": version,
		"date-added": date_added,
		"include": include,
		"exclude": exclude
	}

	data["keyword-lists"][_id] = newKeywordList;
}

/** PYTHON PROCESS AND HELPER FUNCTIONS FOR RUNNING SUBCORPORA TOOL **/

// Sets the name of the run
app.post("/set_run_name", function (req, res) {
	var currData = req.body.data;
	currRun.name = currData.name;
	currRun.date = currData.date;
	console.log("Current run name set to " + currRun.name + ", current date set to " + currRun.date);

	res.sendStatus(200);
});

// Sets the collections used for this particular run
app.post("/choose_collections", function (req, res) {
	var currData = req.body;
	currRun.collections = currData.data;
	console.log("Current run collections updated to " + currRun.collections);

	res.sendStatus(200);
});

// Sets the keyword lists used for this particular run
app.post("/choose_keywords", function (req, res) {
	var currData = req.body;
	currRun.keywordList = currData.data;
	console.log("Current run keyword lists updated to " + currRun.keywordList);

	res.sendStatus(200);
});

app.get("/get_python_progress", function (req, res) {
	const statusMessage = "Loading...";
	currRun.total = 100; // TODO: Remove this later when we actually put in the Python process
	res.status(200).send({total: currRun.total, message: statusMessage});
});

/** DISPLAYING REPORT DATA **/

// Retrieves current data
app.get("/get_current_run_data", function (req, res) {
	if (!(currRun.id in data["runs"])) {
		res.status(404).send(currRun.id + " not in data.");
	}
	res.status(200).send(data["runs"][currRun.id]);
	console.log("Data successfully sent to frontend for report");
});

/** GETTING, UPLOADING, AND UPDATING COLLECTIONS **/

// Retrieves all the collections in JSON format
app.get("/get_collections", function (req, res) {
	res.status(200).send(data["collections"]);
});

/** GETTING AND UPDATING KEYWORD LISTS **/
	
// Retrieves all the keyword lists in JSON format
app.get("/get_keywords", function (req, res) {
	res.status(200).send(data["keyword-lists"]);
});

/** GENERAL PAGE SERVICE **/

// The "catchall" handler: for any request that doesn't
// match one route above, send back React's index.html file.
// This needs to be the last route in index.js.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
