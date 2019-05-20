import React from 'react';
import loadable from '@loadable/component';

const Loading = loadable(() => import('./Loading'));

class Report extends React.Component {
  render() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

export default Report;
