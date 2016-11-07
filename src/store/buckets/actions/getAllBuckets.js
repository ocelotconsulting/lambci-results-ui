import {GET_ALL_BUCKETS} from './types'
import createFetchAction from '../../createFetchAction'

export default () => createFetchAction(GET_ALL_BUCKETS, '/api/buckets')
