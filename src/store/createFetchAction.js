import agent from '../agent'

export default (actionId, url) =>
  (dispatch) => {
    dispatch({type: actionId, status: 'start'})
    agent.get(url)
    .then(({body}) => dispatch({type: actionId, status: 'done', result: body}))
    .catch(error => dispatch({type: actionId, status: 'error', error}))
  }