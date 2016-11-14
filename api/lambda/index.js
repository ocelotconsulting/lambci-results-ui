const routes = require('../routes')
const createRequest = require('./createRequest')
const createResponse = require('./createResponse')

const findRoute = (httpMethod, path) => {
  let params = undefined
  let handler = undefined

  routes.find(route => {
    const routeHandler = route[httpMethod.toLowerCase()]
    const parsed = routeHandler && route.path.parseParams(path)
    if (parsed) {
      handler = routeHandler
      params = parsed
      return true
    }
  })
  return params && {params, handler}
}

exports.handler = (event, context, callback) => {
  const {httpMethod, path} = event
  const {params, handler} = findRoute(httpMethod, path) || {}

  const res = createResponse(callback)

  const sendError = (status, message) => res.status(status).type('text/plain').send(message)

  if (params) {
    const next = error =>
      sendError(500, `An unexpected error occurred: ${error.message || JSON.stringify(error)}`)

    handler(createRequest(params, event), res, next)
  } else {
    sendError(404, `Route not found: ${httpMethod} ${path}`)
  }
}
