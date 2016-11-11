import {SELECT_PROJECT, GET_CONFIG} from './types'
import getAction from '../getAction'
import encode from '../../encode'

export default projectId =>
  dispatch => {
    dispatch({type: SELECT_PROJECT, projectId})
    getAction(dispatch, GET_CONFIG, `/api/projects/${encode(projectId)}/config`)
  }
