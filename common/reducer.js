import combineReducers from 'redux/lib/combineReducers';

export default combineReducers({
  people: require('common/ui/People/reducers'),
});
