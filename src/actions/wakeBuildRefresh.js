import { WAKE_BUILD_REFRESH } from './types'
import refreshBuildsLater from './refreshBuildsLater'
import refreshBuilds from './refreshBuilds'

export default () =>
  (dispatch, getState) => {
    const { builds, projects } = getState()
    const projectId = projects.selected.id
    if (projectId) {
      const { timeoutId } = builds.refresh
      if (timeoutId) clearTimeout(timeoutId)
      dispatch({ type: WAKE_BUILD_REFRESH })
      dispatch(refreshBuilds(refreshBuildsLater, projectId))
    }
  }
