import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import buckets from './buckets'
import project from './project'

export default () => createStore(combineReducers({buckets, project}), applyMiddleware(thunk))

