import agent from '../agent'

export default (dispatch, actionId, url, body) => {
  dispatch({type: actionId, status: 'start'})

  return agent.put(url, body)
  .then(({body}) => {
    dispatch({type: actionId, status: 'done', result: body})
  })
  .catch(error => dispatch({type: actionId, status: 'error', error}))
}
