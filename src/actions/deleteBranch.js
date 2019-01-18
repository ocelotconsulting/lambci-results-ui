import { SAVE_CONFIG } from './types'
import http from './http'
import history from '../history'

export default (projectId, branch) =>
  async (dispatch, getState) => {
    const { value } = getState().config
    const projectConfig = {
      ...value,
      branches: { ...value.branches }
    }
    delete projectConfig.branches[branch]
    await http.put(dispatch, SAVE_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    history.push(`/projects/${encodeURIComponent(projectId)}/config`)
  }
