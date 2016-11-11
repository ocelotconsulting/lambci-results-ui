import {SAVE_CONFIG} from './types'
import putAction from '../putAction'
import encode from '../../encode'

export default (projectId) =>
  (dispatch, getState) => {
    putAction(dispatch, SAVE_CONFIG, `/api/projects/${encode(projectId)}/config`, getState().config)
  }
