import 'css-modules-require-hook/preset';

import React from 'react';
import {renderToString} from 'react-dom/server';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import ssrTemplate from './template';

const routes = require(`${global.config.__common}/routes`);

export default (options = {}) => async function ssrRouteHandler(context, next) {
  // TODO: extract as private function
  if (!options.language || !('string' === typeof options.language)) {
    options.language = context.state.language;
    context.set('Content-Language', context.state.language);
  } else {
    context.set('Content-Language', options.language);
  }
  options.name = options.name || context.app.name;
  options.compact = options.compact || 'production' === context.app.env;

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
      context.status = 200;
      options.content = renderToString(<RouterContext {...renderProps}/>);
      context.body = ssrTemplate(options);
    }
  };
};
