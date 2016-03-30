import Router from 'koa-router';
import htmlTemplate from '../../../common/templates/index';

const about = new Router();

async function route(context, next) {
  context.body = htmlTemplate({
    title: `${process.env.npm_package_name} - About`,
    content: `
    <h1>Univera - About Page</h1>
    <h2>This is a page for test of individual route handling.</h2>
    `
  });
  await next();
}

export default about.get('about', '/about', route);
