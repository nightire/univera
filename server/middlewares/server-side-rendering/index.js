import htmlTemplate from '../../../common/templates/index';

module.exports = (options) => async context => {
  context.body = htmlTemplate(options);
};
