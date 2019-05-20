import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'BWOH',
];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class SelectCollections extends React.Component {
  state = {
    name: [],
    isButtonDisabled: true,
    redirect: false,
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.setState({ isButtonDisabled: false });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });

    this.setState({ isButtonDisabled: false });
  };

  handleButtonClick = () => {
  	this.setState({ redirect: true });
  }

  renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/create_run/select_keywords' />
		}
	}

  render() {
    const { classes } = this.props;

    return (
      <div>
      	<Typography variant='h4'>
      		Select collections <br />
      	</Typography>
      	<br />
      	<Typography paragraph>
      		Choose the collections to include in your run.
      	</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Selected</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" onClick={(e) => {e.preventDefault(); this.handleButtonClick();}} color="primary" disabled={this.state.isButtonDisabled} className={classes.button}>
	        Next
	    </Button>
	    {this.renderRedirect()}
      </div>
    );
  }
}

SelectCollections.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelectCollections);
