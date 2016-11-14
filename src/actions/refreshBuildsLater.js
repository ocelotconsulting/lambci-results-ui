import {SET_BUILD_REFRESH_TIMEOUT_ID} from './types'
import refreshBuilds from './refreshBuilds'

const refreshBuildsLater = () =>
  (dispatch, getState) => {
    const {
      builds: {refresh: {waitTime, sleepThreshold, sleepCount}},
      projects: {selected: {id: selectedProject}}
    } = getState()

    if (sleepCount < sleepThreshold) {
      const onTimerEvent = () =>
        dispatch(refreshBuilds(refreshBuildsLater, selectedProject))

      dispatch({
        type: SET_BUILD_REFRESH_TIMEOUT_ID,
        value: setTimeout(onTimerEvent, waitTime)
      })
    }
  }

export default refreshBuildsLater

