import Router from 'koa-router';
import {ssrRouteHandler} from '../middlewares/server-side-render';

const router = new Router();

router.all('ssr', '/(.*)', ssrRouteHandler({
  language: 'en-US',
  content: `
    <h1>Univera</h1>
    <h2>An Universe Application Architecture</h2>
  `
}));

export default router.routes();
