import {SAVE_CONFIG} from './types'
import http from './http'
import getConfig from './getConfig'

export default (projectId, branch) =>
  (dispatch, getState) => {
    const {value, editing} = getState().config
    const parsedEnv = editing.env.split('\n').reduce((p,c) => {
      const [k, v] = c.split('=')
      if(k && v) {
        p[k.trim()] = v.trim()
      }
      return p
    }, {})

    const editedConfig = {...editing, env: parsedEnv}
    const projectConfig = branch ? {
      ...value, branches: {
        ...value.branches, [branch]: editedConfig
      }
    } : {
      ...value,
      ...editedConfig
    }

    const newBranch = editing.newBranch && editing.newBranch.trim().length > 0 ? editing.newBranch.trim() : undefined
    if(newBranch){
      projectConfig.branches = projectConfig.branches || {}
      projectConfig.branches[newBranch] = {}
    }
    http.put(dispatch, SAVE_CONFIG, `projects/${encodeURIComponent(projectId)}/config`, projectConfig)
    .then(() => dispatch(getConfig(projectId, branch)))

  }
