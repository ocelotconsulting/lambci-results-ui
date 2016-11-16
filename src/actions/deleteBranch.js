import {browserHistory} from 'react-router'
import {SAVE_CONFIG} from './types'
import putAction from './putAction'
import encode from '../encode'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const {value} = getState().config
    const projectConfig = {...value}
    delete projectConfig.branches[branch]
    putAction(dispatch, SAVE_CONFIG, `/api/projects/${encode(projectId)}/config`, projectConfig)
    .then(() => browserHistory.push(`projects/${encode(projectId)}/config`))
  }
