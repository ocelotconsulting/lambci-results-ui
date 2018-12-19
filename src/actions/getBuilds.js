import { SELECT_PROJECT, GET_BUILDS } from './types'
import http from './http'
import maybeRefresh from './maybeRefresh'

export default projectId =>
  (dispatch, getState) => {
    dispatch({ type: SELECT_PROJECT, projectId })
    return http.get(dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`)
    .then(() => maybeRefresh({
      projectId,
      dispatch,
      state: getState()
    }))
  }
