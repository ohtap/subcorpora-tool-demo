import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import loadable from '@loadable/component';
import axios from 'axios';

const SummaryReport = loadable(() => import('./SummaryReport'));

const styles = {
  root: {
    flexGrow: 1,
  },
  loadingText: {
    textAlign: "center",
    fontStyle: "italic",
  },
};

class Report extends React.Component {
	state = {
    completed: 0,
    statusMessage: 'Status message',
    statusTitle: 'Running...',
    summary: false, // Whether or not we display the summary report
  };

	componentDidMount() {
		this.timer = setInterval(this.progress, 500);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Gets the progress of the python process
	progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ summary: true });
    } else {
      axios.get('/get_python_progress')
        .then(res => this.setState({completed: res.data.total, statusMessage: res.data.message}))
        .catch(err => console.log("Error getting progress (" + err + ")"));
    }
  };

  renderLoading = () => {
  	const { classes } = this.props;

  	return (
  		<div>
  		<Typography variant='h4'>
        {this.state.statusTitle}
      </Typography>
      <br />
      <LinearProgress variant="determinate" value={this.state.completed} />
      <Typography paragraph className={classes.textAlign}>
        {this.state.statusMessage}
      </Typography>
      <br />
      </div>
     );
  }

  renderReport = () => {
  	if (this.state.summary) {
  		return (<SummaryReport />);
  	} else {
  		return this.renderLoading();
  	}
  }

  render() {
  	const { classes } = this.props;

    return (
      <div className={classes.root}>
      	{this.renderReport()}
      </div>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Report);
