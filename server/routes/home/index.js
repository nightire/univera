import Router from 'koa-router';
import ssr from '../../middlewares/server-side-rendering';

const home = new Router();

export default home.get('home', '/', ssr({
  title: `${process.env.NAME}`,
  content: `
  <h1>Univera - Home</h1>
  <h2>An Universal Application Architecture</h2>
  `
}));
