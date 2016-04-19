import compose from 'redux/lib/compose';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import middleware from './middleware';

export default (initialState = {}) => {
  const store = createStore(require('./reducer'), initialState, compose(
    applyMiddleware(...middleware),
    (typeof window === 'object'
     && typeof window.devToolsExtension !== 'undefined'
     && 'production' !== process.env.NODE_ENV)
       ? window.devToolsExtension() : _ => _
  ));

  module.hot && module.hot.accept('./reducer', function() {
    store.replaceReducer(require('./reducer'));
  });

  return store;
};
