import React from 'react';
import {Router, Route/*, IndexRoute*/} from 'react-router';
import {
  Application,
} from './ui';

export default history => <Router history={history}>
  <Route path="/" component={Application}/>
</Router>;
