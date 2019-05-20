import React from 'react';
import Typography from '@material-ui/core/Typography';

class Past_Runs extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Typography paragraph>
          Past runs
        </Typography>
      </div>
    );
  }
}

export default Past_Runs;