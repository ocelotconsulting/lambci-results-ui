import agent from 'superagent'
import {apiBaseUrl} from '../config'
import identity from 'lodash/identity'

const apply = ({method, dispatch, actionId, path, requestBody, transform = identity}) => {
  dispatch({type: actionId, status: 'start'})

  return agent[method](`${apiBaseUrl}/${path}`, requestBody)
  .then(({body}) => {
    dispatch({type: actionId, status: 'done', result: transform(body)})
  })
  .catch(error => dispatch({type: actionId, status: 'error', error}))
}

export default {
  get(dispatch, actionId, path, transform) {
    return apply({method: 'get', dispatch, actionId, path, transform})
  },

  put(dispatch, actionId, path, requestBody) {
    return apply({method: 'put', dispatch, actionId, path, requestBody})
  }
}