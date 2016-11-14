import {UPDATE_CONFIG} from './types'

export default (prop, value, branch) =>
  dispatch => dispatch({type: UPDATE_CONFIG, prop, value, branch})
