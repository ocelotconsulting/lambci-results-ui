import {browserHistory} from 'react-router'
import {SAVE_CONFIG} from './types'
import putAction from './putAction'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const {value} = getState().config
    const projectConfig = {...value}
    delete projectConfig.branches[branch]
    putAction(dispatch, SAVE_CONFIG, `/api/projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    .then(() => browserHistory.push(`projects/${encodeURIComponent(projectId)}/config`))
  }
