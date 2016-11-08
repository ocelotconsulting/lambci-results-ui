import {SELECT_BUCKET} from './types'
import getProjects from './getProjects'

export default bucketId =>
  (dispatch, getState) => {
    if (getState().buckets.selected !== bucketId) {
      dispatch({type: SELECT_BUCKET, bucketId})
      dispatch(getProjects(bucketId))
    }
  }
