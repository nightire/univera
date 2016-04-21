import React from 'react';
import {Router, Route} from 'react-router';
// import IndexRoute from 'react-router/lib/IndexRoute';
import {
  Application,
  People
} from './ui';

export default history => <Router history={history}>
  <Route path="/" component={Application}>
    <Route path="people" component={People}/>
  </Route>
</Router>;
