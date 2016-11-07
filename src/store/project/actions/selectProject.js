import {SELECT_PROJECT, GET_BUILDS} from './types'
import createFetchAction from '../../createFetchAction'

export default projectId =>
  (dispatch, getState) => {
    const selectedBucketId = getState().buckets.selected
    const url = `/api/buckets/${encodeURIComponent(selectedBucketId)}/${encodeURIComponent(projectId)}/builds`
    dispatch({type: SELECT_PROJECT, projectId})
    dispatch(createFetchAction(GET_BUILDS, url))
  }
