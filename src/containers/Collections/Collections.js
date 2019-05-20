import React from 'react';
import Typography from '@material-ui/core/Typography';
import loadable from '@loadable/component';

const Collections_Table = loadable(() => import('./Collections_Table'));

class Collections extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Typography variant="h4">
          Collections
        </Typography>
        <Typography paragraph>
          Add/upload, edit, and delete collections. On this demo version, all editing functionality is not allowed.
        </Typography>
        <Collections_Table />
      </div>
    );
  }
}

export default Collections;