import React from 'react';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
// import IndexRoute from 'react-router/lib/IndexRoute';
import {
  Application,
  Animation,
} from './ui';

export default history => <Router history={history}>
  <Route path="/" component={Application}>
    <Route path="demo/:name" component={Animation}/>
  </Route>
</Router>;
