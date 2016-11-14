import {SET_BUILD_REFRESH_ENABLED} from './types'

export default enabled =>
  (dispatch, getState) => {
    const {refresh} = getState().builds

    if (enabled !== refresh.enabled) {
      if (refresh.timeoutId) {
        clearTimeout(refresh.timeoutId)
      }
      dispatch({type: SET_BUILD_REFRESH_ENABLED, value: enabled})
    }
  }