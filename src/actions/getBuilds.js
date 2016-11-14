import {SELECT_PROJECT, GET_BUILDS} from './types'
import getAction from './getAction'
import refreshBuildsLater from './refreshBuildsLater'
import encode from '../encode'

export default projectId =>
  (dispatch, getState) => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_BUILDS, `projects/${encode(projectId)}/builds`)
    .then(() => {
      const {projects, builds} = getState()
      if (builds.value && projects.selected.id === projectId) {
        dispatch(refreshBuildsLater())
      }
    })
  }
