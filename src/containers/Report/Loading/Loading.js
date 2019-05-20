import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = {
  root: {
    flexGrow: 1,
  },
  loadingText: {
    textAlign: "center",
    fontStyle: "italic",
  },
};

class Loading extends React.Component {
  state = {
    completed: 0,
    statusMessage: 'Status message',
    statusTitle: 'Running...',
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
      this.redirect();
    } else {
      axios.get('/get_python_progress')
        .then(res => this.setState({completed: res.data.total, statusMessage: res.data.message}))
        .catch(err => console.log("Error getting progress (" + err + ")"));
    }
  };

  redirect = () => {
    console.log("Redirect");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
