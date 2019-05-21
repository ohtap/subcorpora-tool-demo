import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	paper: {
		...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
	},
});

class IndividualReport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.parentData, // Passed from the parent report
	  };

	  this.setState({ reportName: this.state.collection + "-" + this.state.keywordList + " Report" });
	}

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

			</div>
		);
	}
}

IndividualReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualReport);
