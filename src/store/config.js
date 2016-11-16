import {GET_CONFIG, UPDATE_CONFIG, ADD_BRANCH_CONFIG} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG: {
      switch (action.status) {
        case 'start':
          return {...state, value: undefined, editing: undefined, error: undefined}
        case 'error':
          return {...state, error: action.error}
        case 'done':
          const {result} = action
          const editing = result.branch ? result.branches ? result.branches[result.branch] || {} : {} : result
          const env = Object.keys(editing.env || {}).sort().map((key)=>`${key}=${editing.env[key]}`).join('\n')
          return {...state, value: action.result, editing: {...editing, env: env}}
        default:
          return state
      }
    }
    case UPDATE_CONFIG: {
      return {
        ...state,
        editing: {...state.editing,
          [action.prop]: action.value
        }
      }
    }
    default:
      return state
  }
}
