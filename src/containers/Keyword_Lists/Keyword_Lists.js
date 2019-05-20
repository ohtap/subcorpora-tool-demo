import React from 'react';
import Typography from '@material-ui/core/Typography';
import loadable from '@loadable/component';

const Keyword_Table = loadable(() => import('./Keyword_Table'));

class Keyword_Lists extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Typography variant="h4">
          Keyword Lists
        </Typography>
        <Typography paragraph>
          Add, edit, and delete keyword lists. On this demo version, all editing functionality is not allowed.
        </Typography>
        <Keyword_Table />
      </div>
    );
  }
}

export default Keyword_Lists;