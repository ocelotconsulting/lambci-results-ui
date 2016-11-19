import {SELECT_PROJECT, GET_CONFIG} from './types'
import http from './http'

export default (projectId, branch) =>
  dispatch => {
    dispatch({type: SELECT_PROJECT, projectId})
    http.get(dispatch, GET_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, res => ({...res, branch}))
  }
