import handleActions from 'redux-actions/lib/handleActions';
import {
  SEARCH_PEOPLE
} from './actions.js';

export default handleActions({
  [`${SEARCH_PEOPLE}_成功`](state, action) {
    return action.payload;
  },
}, []);
