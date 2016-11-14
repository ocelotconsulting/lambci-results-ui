import {
  GET_BUILDS, SET_BUILD_REFRESH_ENABLED, REFRESH_BUILDS, SET_BUILD_REFRESH_TIMEOUT_ID, WAKE_BUILD_REFRESH
} from '../actions/types'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'

const initialState = {
  pageSize: 20,
  refresh: {
    enabled: false,
    waitTime: 15 * 1000,
    sleepCount: 0,
    sleepThreshold: 20,
    lastTimestamp: 0 // this will suppress a console error on initial render
  }
}

const refreshBuilds = (value, updates, pageSize) => {
  if (updates.length) {
    const result = {}
    value.forEach(build => result[build.buildNum] = build)

    updates.forEach(update => {
      const existing = result[update.buildNum]
      result[update.buildNum] = existing ? {...existing, ...update} : update
    })

    return sortBy(values(result), ({buildNum}) => -1 * buildNum).slice(0, pageSize)
  } else {
    return value
  }
}

export default (state = initialState, action) => {
  const refresh = updates => ({
    ...state.refresh,
    ...updates
  })

  switch (action.type) {
    case GET_BUILDS:
      switch (action.status) {
        case 'start':
          return {...state, value: undefined, error: undefined, refresh: refresh({sleepCount: 0})}
        case 'error':
          return {...state, error: action.error}
        case 'done':
          return {...state, value: action.result}
        default:
          return state
      }
    case SET_BUILD_REFRESH_ENABLED:
      return {...state, refresh: refresh({enabled: action.value, timeoutId: undefined})}
    case REFRESH_BUILDS: {
      // after 10 successive refreshes with no new changes go to sleep
      const sleepCount = action.result.length ? 0: state.refresh.sleepCount + 1
      const lastTimestamp = Date.now()
      return {
        ...state,
        refresh: refresh({sleepCount, lastTimestamp}),
        value: refreshBuilds(state.value, action.result, state.pageSize)
      }
    }
    case SET_BUILD_REFRESH_TIMEOUT_ID: {
      return {
        ...state,
        refresh: refresh({timeoutId: action.value})
      }
    }
    case WAKE_BUILD_REFRESH: {
      return {
        ...state,
        refresh: refresh({sleepCount: 0})
      }
    }
    default:
      return state
  }
}
