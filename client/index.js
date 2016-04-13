import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import browserHistory from 'react-router/lib/browserHistory';
import createStore from 'common/store';

const store = createStore();
const rootElement = document.getElementById('root');

function render() {
  if (process.env.NODE_ENV !== 'production') {
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
