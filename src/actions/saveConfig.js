import { SAVE_CONFIG } from './types'
import http from './http'
import getConfig from './getConfig'
import parseEnvironment from './parseEnvironment'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const { value, editing } = getState().config

    const editedConfig = { ...editing, env: parseEnvironment(editing.env) }

    const projectConfig = branch ? {
      ...value,
      branches: {
        ...value.branches,
        [branch]: editedConfig
      }
    } : {
      ...value,
      ...editedConfig
    }

    const newBranch = editing.newBranch && editing.newBranch.trim().length > 0 ? editing.newBranch.trim() : undefined
    if (newBranch) {
      projectConfig.branches = projectConfig.branches || {}
      projectConfig.branches[newBranch] = {}
    }
    return http.put(dispatch, SAVE_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    .then(() => dispatch(getConfig(projectId, branch)))
  }
