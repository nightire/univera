export default (header = 'X-Response-Time') => async (context, next) => {
  const start = Date.now();
  await next();
  const delta = Math.ceil(Date.now() - start);
  context.set(header, `${delta}ms`);
};
