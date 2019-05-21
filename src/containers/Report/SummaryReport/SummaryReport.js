import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

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
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SummaryReport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				collections: [],
			},
			summary: true,
		};
	}

	updateCollectionSelections = () => {
		const collections = this.state.data.collections;
		var options = [<MenuItem value=""><em>None</em></MenuItem>];
		for (var i in collections) {
			var c = collections[i];
			options.push(<MenuItem key={c} value={c} label={c}>{c}</MenuItem>);
		}

		this.setState({ collectionOptions: options })
	}

	updateKeywordListSelections = () => {
		const keywords = this.state.data['keyword-lists'];
		var options = [<MenuItem value=""><em>None</em></MenuItem>];
		for (var i in keywords) {
			var k = keywords[i];
			options.push(<MenuItem key={k} value={k} label={k}>{k}</MenuItem>)
		}

		this.setState({ keywordListsOptions: options });
	}

	componentDidMount() {
		axios.get('/get_current_run_data')
			.then(res => this.setState({ data: res.data }))
			.then(data => this.updateCollectionSelections())
			.then(data => this.updateKeywordListSelections())
			.catch(err => console.log("Error getting current run data (" + err + ")"));		
	}

	handleChange = event => {
		console.log(event.target.name);
		console.log(event.target.value);
		this.setState({ [event.target.name]: event.target.value });

		if (event.target.name === 'type') {
			if (event.target.value === 'Summary') {
				this.setState({ summary: true });
			} else {
				this.setState({ summary: false });
			}
		}

		console.log(this.state);
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Typography variant='h4'>
					Summary Report
				</Typography>
				<br />
				<Paper className={classes.paper} elevation={1}>
					<Typography variant='h6'>
						Report Navigation
					</Typography>
					<form autoComplete="off">
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="type">Type</InputLabel>
							<Select
								value={this.state.type}
								onChange={this.handleChange}
								inputProps={{
									name: 'type',
									id: 'type',
								}}
							>
								<MenuItem value=""><em>None</em></MenuItem>
								<MenuItem value="Summary">Summary</MenuItem>
								<MenuItem value="Individual">Individual</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="collection">Collection</InputLabel>
							<Select
								value={this.state.collection}
								onChange={this.handleChange}
								inputProps={{
									name: 'collection',
									id: 'collection'
								}}
								displayEmpty
								className={classes.selectEmpty}
							>
								{this.state.collectionOptions}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="keywordList">Keyword Lists</InputLabel>
							<Select
								value={this.state.keywordList}
								onChange={this.handleChange}
								inputProps={{
									name: 'keywordList',
									id: 'keywordList'
								}}
							>
								{this.state.keywordListsOptions}
							</Select>
						</FormControl>
					</form>
				</Paper>
				<div className={classes.root}>
					Blah blah
				</div>
			</div>
		);
	}
}

SummaryReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SummaryReport);
