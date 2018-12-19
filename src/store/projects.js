import { GET_PROJECTS, SELECT_PROJECT } from '../actions/types'
import getRepository from './getRepository'

const initialState = {
  selected: {
    repository: {}
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PROJECTS:
      switch (action.status) {
        case 'start':
          return { ...state, all: undefined, error: undefined }
        case 'error':
          return { ...state, error: action.error }
        case 'done':
          return { ...state, all: action.result }
        default:
          return state
      }
    case SELECT_PROJECT:
      return {
        ...state,
        selected: {
          id: action.projectId,
          repository: getRepository(action.projectId)
        }
      }
    default:
      return state
  }
}
