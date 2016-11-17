import {
  GET_BUILDS,
  SET_BUILD_REFRESH_ENABLED,
  REFRESH_BUILDS,
  SET_BUILD_REFRESH_TIMEOUT_ID,
  WAKE_BUILD_REFRESH,
  SET_BUILD_PAGE
} from '../actions/types'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import minBy from 'lodash/minBy'

const initialState = {
  paging: {
    pageSize: 20,
    page: 1,
    nextEnabled: false,
    previousEnabled: false
  },
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

export default (state = initialState, action = {}) => {
  const update = (subProperty, updates) => ({
    ...state[subProperty],
    ...updates
  })

  const updateValue = (value, additionalState = {}) => ({
    ...state,
    value,
    paging: update('paging', {
      nextEnabled: value.length === state.paging.pageSize && minBy(value, 'buildNum').buildNum > 1,
      previousEnabled: state.paging.page > 1
    }),
    ...additionalState
  })

  switch (action.type) {
    case GET_BUILDS:
      switch (action.status) {
        case 'start':
          return {
            ...state,
            value: undefined,
            error: undefined,
            paging: update('paging', {nextEnabled: false, previousEnabled: false}),
            refresh: update('refresh', {sleepCount: 0})
          }
        case 'error':
          return {...state, error: action.error}
        case 'done':
          return updateValue(action.result)
        default:
          return state
      }
    case SET_BUILD_REFRESH_ENABLED:
      return {...state, refresh: update('refresh', {enabled: action.value, timeoutId: undefined})}
    case REFRESH_BUILDS: {
      // after 10 successive refreshes with no new changes go to sleep
      const sleepCount = action.result.length ? 0 : state.refresh.sleepCount + 1
      const lastTimestamp = Date.now()
      const newValue = refreshBuilds(state.value, action.result, state.paging.pageSize)
      return updateValue(newValue, {refresh: update('refresh', {sleepCount, lastTimestamp})})
    }
    case SET_BUILD_REFRESH_TIMEOUT_ID: {
      return {
        ...state,
        refresh: update('refresh', {timeoutId: action.value})
      }
    }
    case WAKE_BUILD_REFRESH: {
      return {
        ...state,
        refresh: update('refresh', {sleepCount: 0})
      }
    }
    case SET_BUILD_PAGE: {
      return {
        ...state,
        paging: update('paging', {page: action.value}),
        refresh: update('refresh', {timeoutId: undefined}) // any timeout is now invalid
      }
    }
    default:
      return state
  }
}
