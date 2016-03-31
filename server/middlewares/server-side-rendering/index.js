import htmlTemplate from '../../views';

module.exports = (options) => async context => {
  context.body = htmlTemplate(options);
};
