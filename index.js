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

// Serves the session
const port = process.env.PORT || 5000;
app.listen(port, function() {
	// Creates a session JSON file if one does not exist and writes to it
	// const rawContents = `{ 
	// 	'keyword-lists': {},
	// 	'past-runs': {},
	// 	'collections': {}
	// }`;

	// if (!fs.existsSync(dataFile)) {
	// 	fs.writeFile(dataFile, rawContents, { flag: 'wx' }, function (err) {
	// 	    if (err) throw err;
	// 	});
	// 	initializeData();
	// } else {
	// 	initializeData();
	// }
});
console.log(`OHTAP Subcorpora Tool launched at localhost:${port}\n`);

/** GENERAL PAGE SERVICE **/

// The "catchall" handler: for any request that doesn't
// match one route above, send back React's index.html file.
// This needs to be the last route in index.js.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
