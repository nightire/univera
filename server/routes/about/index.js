import htmlTemplate from '../../../common/templates/index';

export default async (context, next) => {
  context.body = htmlTemplate({
    title: `${process.env.npm_package_name} - About`,
    content: `
    <h1>Univera - About Page</h1>
    <h2>This is a page for test of individual route handling.</h2>
    `
  });
  await next();
};
