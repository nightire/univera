import Router from 'koa-router';
import home from './home';
import about from './about';

const router = new Router();

router.get('home', '/', home);

router.get('about', '/about', about);

export default router;
