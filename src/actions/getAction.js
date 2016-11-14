import agent from '../agent'
import {apiBaseUrl} from '../config'

export default (dispatch, actionId, url, transform = body => body) => {
  dispatch({type: actionId, status: 'start'})

  return agent.get(`${apiBaseUrl}/${url}`)
  .then(({body}) => {
    dispatch({type: actionId, status: 'done', result: transform(body)})
  })
  .catch(error => dispatch({type: actionId, status: 'error', error}))
}