import {GET_ALL_BUCKETS} from './types'
import getAction from '../../getAction'
import history from '../../../history'
import encode from '../../../encode'

export default () =>
  (dispatch, getState) => {
    getAction(dispatch, GET_ALL_BUCKETS, '/api/buckets')
    .then(() => {
      const {all, selected} = getState().buckets
      const singleInstanceId = all && all.length == 1 && all[0].id
      console.log(singleInstanceId, selected)
      if (singleInstanceId && singleInstanceId !== selected) {
        history.push(`/instances/${encode(all[0].id)}`)
      }
    })
  }
