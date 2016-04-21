import combineReducers from 'redux/lib/combineReducers';

export default combineReducers({
  test: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  }
});
