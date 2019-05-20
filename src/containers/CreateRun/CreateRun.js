import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class CreateRun extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			isButtonDisabled: true,
			redirect: false,
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
	}

	handleNameChange = name => event => {
		this.setState({ name: event.target.value });
		this.setState({ isButtonDisabled: false });

		// TODO: Add check for no name entered and disable the button.
	};

	handleButtonChange(event) {
		this.setState({ redirect: true });
	}

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/create_run/select_collections' />
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Typography variant='h4'>
					Name your run
				</Typography>
				<br />
				<Typography paragraph>
					Give this run a name.
				</Typography>
				<form className={classes.container} noValidate autoComplete="off">
			        <TextField
			          id="standard-name"
			          label="Name"
			          className={classes.textField}
			          value={this.state.name}
			          onChange={this.handleNameChange('name')}
			          margin="normal"
			        />

			        <TextField
			          disabled
			          id="standard-disabled"
			          label="Date"
			          defaultValue="5/31/2019"
			          className={classes.textField}
			          margin="normal"
			        />
			    </form>
			    <Button variant="contained" onClick={(e) => {e.preventDefault(); this.handleButtonChange();}} color="primary" disabled={this.state.isButtonDisabled} className={classes.button}>
			    	Next
			    </Button>
			    {this.renderRedirect()}
			</div>
		);
	}
}

CreateRun.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateRun);
