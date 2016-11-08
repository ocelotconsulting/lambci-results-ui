import {GET_PROJECTS} from './types'
import getAction from '../../getAction'
import encode from '../../../encode'

export default bucketId =>
  dispatch => {
    getAction(dispatch, GET_PROJECTS, `/api/buckets/${encode(bucketId)}/projects`)
  }
