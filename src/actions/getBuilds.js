import {SELECT_PROJECT, GET_BUILDS} from './types'
import getAction from './getAction'
import refreshBuildsLater from './refreshBuildsLater'

export default projectId =>
  (dispatch, getState) => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`)
    .then(() => {
      const {projects, builds} = getState()
      if (builds.value && projects.selected.id === projectId) {
        dispatch(refreshBuildsLater())
      }
    })
  }
