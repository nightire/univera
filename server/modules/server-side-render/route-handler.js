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
  // TODO: extract as private function
  if (!options.language || !('string' === typeof options.language)) {
    options.language = context.state.language;
  }
  options.name = options.name || context.app.name;
  options.compact = options.compact || 'production' === context.app.env;

  const routes = createRoutes(createMemoryHistory());
  match({routes, location: context.url}, processRoutes(context, options));
  await next();
};

const processRoutes = (context, options) => {
  // TODO: figuring out how 500 and 302 happens in react-router
  return function(error, redirectLocation, renderProps) {
    if (error) {
      context.status = 500;
      context.body = error.message;
    }

    if (redirectLocation) {
      const {pathname, search} = redirectLocation;
      context.status = 302;
      context.redirect(`${pathname}${search}`);
    }

    if (renderProps) {
      const store = createStore();
      options.content = renderToString(
        <Provider store={store} key="provider">
          <RouterContext {...renderProps}/>
        </Provider>
      );
      context.set('Content-Language', options.language);
      context.status = 200;
      context.body = ssrTemplate(options);
    }
  };
};
