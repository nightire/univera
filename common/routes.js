import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {
  Application,
  Motions,
  MotionsList,
  Motion,
} from './ui';

export default history => <Router history={history}>
  <Route path="/" component={Application}>
    <Route path="motions" component={Motions}>
      <IndexRoute component={MotionsList}/>
      <Route path=":name" component={Motion}/>
    </Route>
  </Route>
</Router>;
