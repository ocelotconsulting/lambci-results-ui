import {GET_ALL_BUCKETS, SELECT_BUCKET, GET_PROJECTS} from './actions/types'

const initialState = {}

const handleGet = (state, action, propertyName) => {
  switch (action.status) {
    case 'start':
      return {...state, [propertyName]: undefined, projects: undefined, error: undefined}
    case 'error':
      return {...state, error: action.error}
    case 'done':
      return {...state, [propertyName]: action.result}
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUCKETS:
      return handleGet(state, action, 'all')
    case SELECT_BUCKET:
      return {...state, selected: action.bucketId}
    case GET_PROJECTS:
      return handleGet(state, action, 'projects')
    default:
      return state
  }
}
