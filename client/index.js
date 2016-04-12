import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from '../common/routes';

module.hot && module.hot.accept();

ReactDOM.render(
  <Router children={routes} history={browserHistory}/>,
  document.getElementById('root')
);
