import {SELECT_PROJECT, GET_BUILDS} from './types'
import getAction from '../../getAction'
import encode from '../../../encode'

export default projectId =>
  (dispatch, getState) => {
    const {project, buckets} = getState()
    if (project.selected !== projectId) {
      const selectedBucketId = buckets.selected
      const url = `/api/buckets/${encode(selectedBucketId)}/projects/${encode(projectId)}/builds`
      dispatch({type: SELECT_PROJECT, projectId})
      getAction(dispatch, GET_BUILDS, url)
    }
  }
