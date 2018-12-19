import { SET_BUILD_REFRESH_TIMEOUT_ID } from './types'
import refreshBuilds from './refreshBuilds'

let timeoutId = 0

export const cleanup = () => {
  clearTimeout(timeoutId)
}

const setTimeoutDelegate = (fn, ms) => {
  timeoutId = setTimeout(fn, ms)
  return timeoutId
}

const refreshBuildsLater = () =>
  (dispatch, getState) => {
    const {
      builds: { refresh: { waitTime, sleepThreshold, sleepCount } },
      projects: { selected: { id: selectedProject } }
    } = getState()

    if (sleepCount < sleepThreshold) {
      const onTimerEvent = () =>
        dispatch(refreshBuilds(selectedProject, () => dispatch(refreshBuildsLater())))

      dispatch({
        type: SET_BUILD_REFRESH_TIMEOUT_ID,
        value: setTimeoutDelegate(onTimerEvent, waitTime)
      })
    }
  }

export default refreshBuildsLater
