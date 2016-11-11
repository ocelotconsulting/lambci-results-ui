import {REFRESH_BUILDS} from './types'
import encode from '../../encode'
import agent from '../../agent'

export default () =>
  (dispatch, getState) => {
    const getSelectedProjectId = () => {
      const {selectedProject} = getState()
      return selectedProject && selectedProject.id
    }
    const selectedProjectId = getSelectedProjectId()
    if (selectedProjectId) {
      return agent.get(`/api/projects/${encode(selectedProjectId)}/builds`)
      .then(({body}) => {
        if (selectedProjectId === getSelectedProjectId()) {
          dispatch({type: REFRESH_BUILDS, result: body})
        }
      })
      .catch(() => {}) // ignore the error... will retry later if appropriate
    }
  }
