import {SELECT_PROJECT, GET_BUILDS} from './types'
import getAction from './getAction'
import maybeRefresh from './maybeRefresh'

export default projectId =>
  (dispatch, getState) => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`)
    .then(() => maybeRefresh({
      projectId: projectId,
      state: getState(),
      dispatch
    }))
  }
