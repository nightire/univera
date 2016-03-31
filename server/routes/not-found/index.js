export default async function notfoundRoute(context, next) {
  if (context.status === 404 && context.accepts('html')) {
    context.body = require('../../views')({
      title: `${process.env.NAME} - 404`,
      content: `
      <h1>404</h1>
      <hr/>
      <p>We can not found what you expected, <a href="/">Go Home</a> and try again.</p>
      `
    });
  } else {
    await next();
  }
}
