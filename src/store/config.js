import {GET_CONFIG, UPDATE_CONFIG, ADD_BRANCH_CONFIG} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG: {
      switch (action.status) {
        case 'start':
          return {...state, value: undefined, error: undefined}
        case 'error':
          return {...state, error: action.error}
        case 'done':
          return {...state, value: action.result}
        default:
          return state
      }
    }
    case UPDATE_CONFIG: {
      const {value} = state
      if (action.branch) {
        const branches = value.branches || {}
        const branch = branches[action.branch] || {}
        return {
          ...state,
          value: {
            ...value,
            branches: {
              ...branches,
              [action.branch]: {
                ...branch,
                [action.prop]: action.value
              }
            }
          }
        }
      } else {
        return {
          ...state,
          value: {
            ...value,
            [action.prop]: action.value
          }
        }
      }
    }
    case ADD_BRANCH_CONFIG: {
      const {value} = state
      const branches = value.branches || {}
      return {
        ...state,
        value: {
          ...value,
          branches: {
            ...branches,
            [action.branch]: {build: true}
          }
        }
      }
    }
    default:
      return state
  }
}
