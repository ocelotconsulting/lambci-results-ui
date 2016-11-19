import {SAVE_CONFIG} from './types'
import http from './http'
import history from '../history'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const {value} = getState().config
    const projectConfig = {...value}
    delete projectConfig.branches[branch]
    http.put(dispatch, SAVE_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    .then(() => history.push(`/projects/${encodeURIComponent(projectId)}/config`))
  }
