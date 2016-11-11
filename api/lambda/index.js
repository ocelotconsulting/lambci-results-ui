const routes = require('../routes')
const createRequest = require('./createRequest')
const createResponse = require('./createResponse')

const findRoute = (httpMethod, path) => {
  let params = undefined
  let handler = undefined

  routes.find(route => {
    const routeHandler = route[httpMethod]
    const parsed = routeHandler && route.path.parseParams(path)
    if (parsed) {
      handler = routeHandler
      params = parsed
      return true
    }
  })
  return params && {params, handler}
}

exports.handler = ({httpMethod, path, body, headers}, context, callback) => {
  const {params, handler} = findRoute(httpMethod, path)

  const res = createResponse(callback)

  if (params) {
    handler(createRequest({params, body, headers}), res, error =>
      res.status(500).type('text/plain').send(
        `An unexpected error occurred: ${error.message || JSON.stringify(error)}`
      )
    )
  } else {
    res.status(404).type('text/plain').send(`Route not found ${httpMethod} ${path}`)
  }
}
