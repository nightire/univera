import handleActions from 'redux-actions/lib/handleActions';
import {
  FETCH_ARSENAL_TEAM,
  FETCH_ARSENAL_PLAYERS
} from './action.js';
import omit from 'lodash/omit';

export default handleActions({
  [`${FETCH_ARSENAL_TEAM}_读取`](state) {
    return {...state, loading: true};
  },

  [`${FETCH_ARSENAL_TEAM}_成功`](state, {payload}) {
    const {_links} = payload;
    const team = omit(payload, '_links');
    return {...state, loading: false, ...team, meta: _links};
  },

  [`${FETCH_ARSENAL_TEAM}_失败`](state, {error}) {
    return {...state, loading: false, error};
  },

  [`${FETCH_ARSENAL_PLAYERS}_读取`](state) {
    return {...state, loading: true};
  },

  [`${FETCH_ARSENAL_PLAYERS}_成功`](state, {payload}) {
    return {...state, loading: false, ...payload};
  },

  [`${FETCH_ARSENAL_PLAYERS}_失败`](state, {error}) {
    return {...state, loading: false, error};
  },
}, {
  loading: false,
  meta: {},
  players: []
});
