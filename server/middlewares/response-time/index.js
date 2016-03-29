module.exports = responseTime;

function responseTime(header = 'X-Response-Time') {
  return async function responseTime(context, next) {
    const start = Date.now();
    await next();
    const delta = Math.ceil(Date.now() - start);
    context.set(header, `${delta}ms`);
  }
}
