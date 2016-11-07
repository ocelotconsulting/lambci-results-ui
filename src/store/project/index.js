import {SELECT_PROJECT, GET_BUILDS} from './actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return {...state, selected: action.projectId}
    case GET_BUILDS:
      switch (action.status) {
        case 'start':
          return {...state, builds: undefined, error: undefined}
        case 'error':
          return {...state, error: action.error}
        case 'done':
          return {...state, builds: action.result}
        default:
          return state
      }
    default:
      return state
  }
}
