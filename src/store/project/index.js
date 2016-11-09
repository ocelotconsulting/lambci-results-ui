import {SELECT_PROJECT, GET_BUILDS} from './actions/types'
import startsWith from 'underscore.string/startsWith'

const initialState = {
  repository: {}
}

const githubPrefix = 'gh/'

const repository = projectId => startsWith(projectId, githubPrefix) ? {
  baseUrl: 'https://github.com',
  icon: 'github',
  project: projectId.slice(githubPrefix.length)
} : {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PROJECT:
      return {...state, selected: action.projectId, repository: repository(action.projectId)}
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
