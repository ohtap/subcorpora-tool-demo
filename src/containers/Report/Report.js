import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import loadable from '@loadable/component';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const Navigation = loadable(() => import('./Navigation'));
const Loading = loadable(() => import('./Loading'));
const SummaryReport = loadable(() => import('./SummaryReport'));
const IndividualReport = loadable(() => import('./IndividualReport'));

const styles = {

};

class Report extends React.Component {
	state = {
		loading: true,
		summary: true,
		collection: '',
		keywordList: '',
		data: {},
	};

	// Callback from child Loading component when done loading
	endLoading = () => {
		axios.get('/get_current_run_data')
			.then(res => this.setState({ data: res.data }))
			.then(data => this.setState({ loading: false }))
			.catch(err => console.log("Error getting current run data (" + err + ")"));	
	};

	renderNavigation = () => {
		if (!this.state.loading) {
			return (<Navigation />);
		}
	}

	renderReport = () => {
		if (this.state.loading) {
			return (<Loading callbackDone={this.endLoading} />);
		}
		if (this.state.summary) {
			return (<SummaryReport />);
		}

		return (<IndividualReport />);
	}

	render() {
		return (
			<div>
				{this.renderNavigation()}
				{this.renderReport()}
			</div>
		);
	}
}

Report.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Report);
