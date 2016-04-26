import React, {Component} from 'react';
import {Link} from 'react-router';

const motionList = [
  {name: 'basic-scrolling', text: '基础滚动触发动效'}
];

export default class MotionsList extends Component {
  render() {
    return <content>
      <header>
        <h3>Please select a motion to preview: </h3>
      </header>
      <ul>{
        motionList.map(motion => <li key={motion.name}>
          <Link to={{
            pathname: `/motions/${motion.name}`,
            state: {enter: 'Right', leave: 'Left'}
          }}>{motion.text}</Link>
        </li>)
      }</ul>
    </content>;
  }
}
