import Router from 'koa-router';
import home from './home';
import about from './about';

const router = new Router();

router.use('', router.allowedMethods(), home.routes(), about.routes());

export default router;
