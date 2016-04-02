import Router from 'koa-router';
import extractLanguage from '../services/extract-language';
import {ssrRouteHandler} from '../services/server-side-render';

const router = new Router();

const ssr = ssrRouteHandler({
  // language: 'en-US',
  content: `
  <h1>Univera</h1>
  <h2>An Universe Application Architecture</h2>
  `
});

router.use(extractLanguage, ssr);

router.get('ssr', '/(.*)');

export default router.routes();
