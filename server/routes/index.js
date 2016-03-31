import Router from 'koa-router';
import home from './home';
import about from './about';

const router = new Router();

router.use('', home.routes(), about.routes());

router.all('/(.*)', require('./not-found'));

export default router;
