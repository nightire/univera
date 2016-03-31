export default options => async context => {
  context.body = require('../../views/')(options);
};
