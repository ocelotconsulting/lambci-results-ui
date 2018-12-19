import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import builds from './builds'
import config from './config'
import projects from './projects'

const logger = createLogger()

export default () =>
  createStore(combineReducers({ builds, config, projects }), applyMiddleware(thunk, logger))
