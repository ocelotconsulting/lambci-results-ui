import {REFRESH_BUILDS} from './types'
import encode from '../../encode'
import agent from '../../agent'

const shouldRefresh = (oldValue = [], newValue = []) => {
  const isPending = ({status}) => status === 'pending'

  const buildNumDoesNotMatch = () => oldValue.length && (oldValue[0].buildNum !== newValue[0].buildNum)

  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

  const pendingDoesNotMatch = () => !eq(oldValue.filter(isPending), newValue.filter(isPending))

  return oldValue.length !== newValue.length || buildNumDoesNotMatch() || pendingDoesNotMatch()
}

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
        if (selectedProjectId === getSelectedProjectId() && shouldRefresh(getState().builds, body)) {
          dispatch({type: REFRESH_BUILDS, result: body})
        }
      })
      .catch(() => {
        // ignore any error... will retry later if appropriate
      })
    }
  }
