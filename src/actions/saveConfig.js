import {SAVE_CONFIG} from './types'
import putAction from './putAction'
import encode from '../encode'

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
    const projectConfig = branch ? {...value, branches: {...value.branches, [branch]: editedConfig}} : Object.assign({}, value, editedConfig)
    putAction(dispatch, SAVE_CONFIG, `/projects/${encode(projectId)}/config`, projectConfig)
  }
