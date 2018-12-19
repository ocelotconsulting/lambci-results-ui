import { UPDATE_CONFIG } from './types'

export default (prop, value) =>
  dispatch => dispatch({ type: UPDATE_CONFIG, prop, value })
