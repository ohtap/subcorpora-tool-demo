import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Line, Bar, Doughnut} from 'react-chartjs-2';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
	root: {

	},
	chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
	paper: {
		...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
	},
});

function createData() {

}

class IndividualReport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.parentData, // Passed from the parent report
				timeRangeInterviewsData: {},
				timeRangeBirthYearData: {},
				keywordCounts: {},
				intervieweeRaceData: {},
		  };
	  }

	  this.setState({ reportName: this.state.collection + "-" + this.state.keywordList + " Report" });
	}

	componentDidMount() {
		this.generateTimeRangeInterviewsData();
  	this.generateTimeRangeBirthYear();
  	this.generateKeywordCountsData();
  	this.generateIntervieweeRaceData();
  }

  generateKeywordCountsData = () => {
  	var labels = [];
  	var values = [];
  	const data = this.state.data['summary-report']['keyword-counts'];
  	for (var key in data) {
  		const value = data[key]
  		labels.push(key);
  		values.push(value);
  	}

  	const newData = {
		  labels: labels,
		  datasets: [
		    {
		      label: 'Counts of Keyword Found',
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: values
		    }
		  ]
		};

  	this.setState({ keywordCounts: newData });
  }

  generateTimeRangeInterviewsData = () => {
		var labels = [];
		var values = [];
  	const data = this.state.data['summary-report']['time-range-interviews'];
  	for (var key in data) {
  		const value = data[key]
  		labels.push(key);
  		values.push(value);
  	}

  	const newData = {
		  labels: labels,
		  datasets: [
		    {
		      label: 'Time Range of Interviews (by decade)',
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: 'rgba(75,192,192,0.4)',
		      borderColor: 'rgba(75,192,192,1)',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
		      pointHitRadius: 10,
		      data: values
		    }
		  ]
		};

		this.setState({ timeRangeInterviewsData: newData });
	};

	generateTimeRangeBirthYear = () => {
		// TODO: Sort them by the key
		const newData = [];
		const data = this.state.data['summary-report']['time-range-birth-year'];
		for (var key in data) {
			const value = data[key];
			newData.push({lineValue: value, argument: parseInt(key)});
		}

		this.setState({ timeRangeBirthYearData: newData });
	};

	render() {
		const { classes } = this.props;
		const summaryData = this.state.data['summary-report'];

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={1}>
	        <Typography variant="h5" component="h3">
	          Basic Information
	        </Typography>
	        <Typography component="p">
	          <b>Total collections: </b>{ summaryData['total-collections'] }<br />
	          <b>&#x00025; collections with keywords: </b>{ (summaryData['total-collections-with-keywords'] / summaryData['total-collections']) * 100 } &#x00025;<br />
	          <b>Total interviews: </b>{ summaryData['total-interviews'] }<br />
	          <b>&#x00025; interviews with keywords: </b>{ (summaryData['total-interviews-with-keywords'] / summaryData['total-interviews']) * 100 } &#x00025;<br />
	          <b>Total keywords: </b>{ summaryData['total-keywords'] }<br />
	          <b>Total keywords found: </b>{ summaryData['total-keywords-found'] }<br />
	        </Typography>
	      </Paper>
	      <br />
	      <Paper className={classes.paper} elevation={1}>
	      	<Typography variant="h5" component="h3">
	          Keyword Counts
	        </Typography>
	      	<Bar
	      		data = {kcData}
	      	/>
	      </Paper>
	      <Paper className={classes.paper} elevation={1}>
	      	<Typography variant="h5" component="h3">
	          Time Range of Interviews
	        </Typography>
	      	<Line data={triData} />
	      </Paper>
	      <br />
	      <Paper className={classes.paper} elevation={1}>
	      	<Typography variant="h5" component="h3">
	          Race of Interviewees
	        </Typography>
	      	<Doughnut data={irData} />
	      </Paper>
	      <Paper className={classes.paper} elevation={1}>
	      	<Typography variant="h5" component="h3">
	          Keywords in Context
	        </Typography>
	       </Paper>
		</div>
		);
	}
}

IndividualReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualReport);
