import handleActions from 'redux-actions/lib/handleActions';

export default handleActions({
  ['获取用户列表_成功']: {
    next(state, action) {
      return action.payload;
    },
    error() {
    },
  }
}, []);
