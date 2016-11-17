import {SAVE_CONFIG} from './types'
import putAction from './putAction'
import history from '../history'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const {value} = getState().config
    const projectConfig = {...value}
    delete projectConfig.branches[branch]
    putAction(dispatch, SAVE_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    .then(() => history.push(`/projects/${encodeURIComponent(projectId)}/config`))
  }
