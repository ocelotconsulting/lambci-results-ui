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
        dispatch(refreshBuilds(selectedProject, () => dispatch(refreshBuildsLater())))

      dispatch({
        type: SET_BUILD_REFRESH_TIMEOUT_ID,
        value: setTimeout(onTimerEvent, waitTime)
      })
    }
  }

export default refreshBuildsLater

