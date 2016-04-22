import 'css-modules-require-hook/preset';

import React from 'react';
import {renderToString} from 'react-dom/server';
import match from 'react-router/lib/match';
import createRoutes from 'common/routes';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import Provider from 'react-redux/lib/components/Provider';
import createStore from 'common/store';
import ssrTemplate from './template';

export default (options = {}) => async function ssrRouteHandler(context, next) {
  if (!options.language || !('string' === typeof options.language)) {
    options.language = context.state.language;
  }
  context.set('Content-Language', options.language);

  options.name = options.name || context.app.name;
  options.compact = options.compact || 'production' === context.app.env;

  const routes = createRoutes(createMemoryHistory());
  await asyncMatch({routes, location: context.url}, context, options);
  context.status = 200;
  context.body = ssrTemplate(options);

  await next();
};

function asyncMatch({routes, location}, context, options) {
  return new Promise(resolve => {
    match({routes, location}, (error, redirectLocation, renderProps) => {
      // TODO: figuring out how 500 and 302 happens in react-router
      if (error) context.status = 500, context.body = error.message;

      if (redirectLocation) {
        const {pathname, search} = redirectLocation;
        context.status = 302;
        context.redirect(`${pathname}${search}`);
      }

      if (renderProps) {
        const store = createStore();
        resolve(Promise.all(
          renderProps.components
            .filter(component => component && component.fetchData)
            .map(component => store.dispatch(component.fetchData()))
        )
        .then(() => options.state = JSON.stringify(store.getState()))
        .then(() => options.content = renderToString(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps}/>
          </Provider>
        )));
      }
    });
  });
}
