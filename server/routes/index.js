import Router from 'koa-router';
import extractLanguage from '../services/extract-language';
import {ssrRouteHandler} from '../services/server-side-render';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server'; // eslint-disable-line
import App from '../../common/App';

const router = new Router();
const ssr = ssrRouteHandler({
  content: renderToStaticMarkup(<App name="Univera"/>)
  // content: `<div id="react-root">${renderToString(<App name="Univera"/>)}</div>`
});

router.get('ssr', '/');
router.use(extractLanguage, ssr);

export default router.routes();
