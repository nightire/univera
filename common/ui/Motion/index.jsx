import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Motion extends Component {
  render() {
    return <content>
      <header>
        <h3>Motion Descriptions</h3>
        <Link to={{
          pathname: `/motions`,
          state: {enter: 'Left', leave: 'Right'}
        }}>返回</Link>
      </header>
    </content>;
  }
}
