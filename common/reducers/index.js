import combineReducers from 'redux/lib/combineReducers';

import intro from './intro';
import counter from './counter';

export default combineReducers({
  intro,
  counter
});
