import {SELECT_BUCKET} from './types'

export default bucketId =>
  (dispatch) => {
    dispatch({type: SELECT_BUCKET, bucketId})

  }
