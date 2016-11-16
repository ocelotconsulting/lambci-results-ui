import {SELECT_PROJECT, GET_CONFIG} from './types'
import getAction from './getAction'

export default (projectId, branch) =>
  dispatch => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_CONFIG, `/projects/${encodeURIComponent(projectId)}/config`, res => ({...res, branch}))
  }
