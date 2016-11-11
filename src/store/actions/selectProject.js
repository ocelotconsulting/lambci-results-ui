import {SELECT_PROJECT, GET_BUILDS} from './types'
import getAction from '../getAction'
import encode from '../../encode'

export default projectId =>
  (dispatch, getState) => {
    const {selectedProject} = getState()
    const selectedId = selectedProject && selectedProject.id
    if (selectedId !== projectId) {
      const url = `/api/projects/${encode(projectId)}/builds`
      dispatch({type: SELECT_PROJECT, projectId})
      getAction(dispatch, GET_BUILDS, url)
    }
  }
