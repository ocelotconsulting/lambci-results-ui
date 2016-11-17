import agent from '../agent'
import {apiBaseUrl} from '../config'

export default (dispatch, actionId, url, body) => {
  dispatch({type: actionId, status: 'start'})

  return agent.put(`${apiBaseUrl}/${url}`, body)
  .then(({body}) => dispatch({type: actionId, status: 'done', result: body}))
  .catch(error => dispatch({type: actionId, status: 'error', error}))
}
