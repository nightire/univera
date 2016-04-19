import Router from 'koa-router';
import extractLanguage from '../modules/extract-language';
import {ssrRouteHandler} from '../modules/server-side-render';

const router = new Router();
const ssr = ssrRouteHandler();

router.use(extractLanguage).get('ssr', '*', ssr);

export default router.routes();
