import createRoutes from 'common/routes';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import createStore from 'common/store';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Provider from 'react-redux/lib/components/Provider';
import RouterContext from 'react-router/lib/RouterContext';
import Helmet from 'react-helmet';
import ssrTemplate from './template';

export default function matchAsyncPrefetch(context, options) {
  const location = context.url;
  const routes = createRoutes(createMemoryHistory());

  return new Promise(resolve => {
    match({routes, location}, function(error, redirectLocation, renderProps) {
      if (error) {
        context.status = 500;
        context.body = error.message;
        resolve(true);
      }

      if (redirectLocation) {
        context.status = 302;
        const {pathname, search} = redirectLocation;
        context.redirect(`${pathname + search}`);
        resolve(true);
      }

      if (renderProps) {
        const store = createStore();
        const fetch = Promise.all(
          renderProps.components
            .filter(c => c && c.fetchData)
            .map(c => store.dispatch(c.fetchData()))
        );
        resolve(fetch.then(() => {
          options.state = JSON.stringify(store.getState());
          options.content = renderToString(
            <Provider store={store} key="provider">
              <RouterContext {...renderProps}/>
            </Provider>
          );
          options.head = Helmet.rewind();
          context.status = 200;
          context.body = ssrTemplate(options);
        }));
      } else {
        context.status = 404;
        context.body = 'Not Found';
        resolve(true);
      }
    });
  });
}
