import {SELECT_PROJECT, GET_CONFIG} from './types'
import getAction from './getAction'
import encode from '../encode'

export default (projectId, branch) =>
  dispatch => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_CONFIG, `/projects/${encode(projectId)}/config`, (res) => ({...res, branch: branch}))
  }
