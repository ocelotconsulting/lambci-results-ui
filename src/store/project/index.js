import {SELECT_PROJECT, GET_BUILDS, GET_CONFIG, UPDATE_CONFIG, ADD_BRANCH_CONFIG} from './actions/types'
import getRepository from '../getRepository'

const initialState = {
  repository: {}
}

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
    case SELECT_PROJECT:
      return {...state, selected: action.projectId, repository: getRepository(action.projectId)}
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
    case GET_CONFIG:
      switch (action.status) {
        case 'start':
          return {...state, config: undefined, error: undefined}
        case 'error':
          if (action.error.status === 404) {
            return {...state, config: {}}
          }
          else {
            return {...state, error: action.error}
          }
        case 'done':
          return {...state, config: action.result}
        default:
          return state
      }
    case UPDATE_CONFIG: {
      if(action.branch){
        return {...state, config: {...state.config, branches: {...state.config.branches,
            [action.branch]: {...state.config.branches[action.branch], [action.prop]: action.value}}}}
      }
      else{
        return {...state, config: {...state.config, [action.prop]: action.value}}
      }
    }
    case ADD_BRANCH_CONFIG: {
      return {...state, config: {...state.config, branches: {...state.config.branches,
            [action.branch]: {build: true}}}}
    }
    default:
      return state
  }
}
