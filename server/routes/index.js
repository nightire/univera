import ssr from '../middlewares/server-side-render';

const router = require('koa-router')();

router.all('ssr', '/(.*)', ssr.routeHandler({
  content: `
    <h1>Univera</h1>
    <h2>An Universe Application Architecture</h2>
  `
}));

export default router.routes();
