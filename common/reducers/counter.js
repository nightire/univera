export function increase(payload) {
  return {type: 'redux/counter/increase', payload};
}

export default (state = {count: 0}, action) => {
  switch (action.type) {
    case 'redux/counter/increase':
      return {count: state.count + action.payload};
    default:
      return state;
  }
};
