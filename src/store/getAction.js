import agent from '../agent'

export default (dispatch, actionId, url, transform = body => body) => {
  dispatch({type: actionId, status: 'start'})

  return agent.get(url)
  .then(({body}) => {
    dispatch({type: actionId, status: 'done', result: transform(body)})
  })
  .catch(error => {
    error.stack && console.error(error.stack)
    dispatch({type: actionId, status: 'error', error})
  })
}