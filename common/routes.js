import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {
  Application,
  Motions,
  MotionsList,
  BasicScrolling,
  AdvancedMotion
} from './ui';

function getMotionComponent(nextState, callback) {
  switch (nextState.params.name) {
    case 'basic-scrolling':
      callback(null, BasicScrolling); break;
    case 'advanced-scrolling':
      callback(null, AdvancedMotion); break;
  }
}

export default history => <Router history={history}>
  <Route path="/" component={Application}>
    <Route path="motions" component={Motions}>
      <IndexRoute component={MotionsList}/>
      <Route path=":name" getComponent={getMotionComponent}/>
    </Route>
  </Route>
</Router>;
