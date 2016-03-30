import htmlTemplate from '../../../common/templates/index';

module.exports = (options) => async (context, next) => {
  context.body = htmlTemplate(options);
  await next();
};
