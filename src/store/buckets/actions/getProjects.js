import {GET_PROJECTS} from './types'
import createFetchAction from '../../createFetchAction'

export default bucketId => createFetchAction(GET_PROJECTS, `/api/buckets/${encodeURIComponent(bucketId)}/projects`)
