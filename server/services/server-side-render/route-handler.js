import 'css-modules-require-hook/preset';

import React from 'react';
import {renderToString} from 'react-dom/server';
import ssrTemplate from './template';

const {__common} = global.config;
const {Intro} = require(`${__common}/routes`);

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
  options.content = renderToString(<Intro/>);
  context.body = ssrTemplate(options);

  await next();
};
