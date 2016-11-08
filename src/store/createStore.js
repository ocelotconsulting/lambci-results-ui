import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//noinspection JSFileReferences
import buckets from './buckets'
//noinspection JSFileReferences
import project from './project'
import createLogger from 'redux-logger'

const logger = createLogger()

export default () =>
  createStore(
    combineReducers({buckets, project}),
    //applyMiddleware(thunk)
    applyMiddleware(thunk, logger)
  )

