
export default (prop, value) =>
  (dispatch, getState) => dispatch({type: 'UPDATE_CONFIG', prop: prop, value: value})
