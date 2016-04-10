import 'css-modules-require-hook/preset';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {Intro} from '../../../common/routes';
import ssrTemplate from './template';

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

  // TODO: better way or place to get/set user-agent?
  options.content = renderToString(<Intro/>);

  context.body = ssrTemplate(options);
  await next();
};
