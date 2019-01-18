import { GET_BUILDS, SELECT_PROJECT } from './types'
import http from './http'
import maybeRefresh from './maybeRefresh'

export default projectId =>
  async (dispatch, getState) => {
    dispatch({ type: SELECT_PROJECT, projectId })
    await http.get(dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`)
    maybeRefresh({
      projectId,
      dispatch,
      state: getState()
    })
  }
