import {UPDATE_CONFIG} from './types'

export default (prop, value, branch) =>
  (dispatch, getState) => dispatch({type: UPDATE_CONFIG, prop, value, branch})
