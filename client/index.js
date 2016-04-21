import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import browserHistory from 'react-router/lib/browserHistory';
import createStore from 'common/store';

const store = createStore(window.__INITIAL_STATE__);
const rootElement = document.getElementById('root');
document.body.removeChild(document.querySelector('[data-recycle]'));

function render() {
  if ('production' !== process.env.NODE_ENV) {
    ReactDOM.unmountComponentAtNode(rootElement);
  }

  ReactDOM.render(
    <Provider store={store} key="provider">
      {require('common/routes')(browserHistory)}
    </Provider>, rootElement
  );
}

render();

module.hot && module.hot.accept('common/routes', render);
