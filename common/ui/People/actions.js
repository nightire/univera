import createAction from 'redux-actions/lib/createAction';

export const SEARCH_PEOPLE = '用户：获取列表';

export default {
  listPeople: createAction(SEARCH_PEOPLE),
};
