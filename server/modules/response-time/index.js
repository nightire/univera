export default () => async function responseTime(context, next) {
  const start = Date.now()
  await next()
  const delta = Math.ceil(Date.now() - start)
  context.set('X-Response-Time', `${delta}ms`)
}
