const routes = require('../routes')

module.exports = (method, requestPath) => {
  for (let i = 0; i < routes.length; i++) {
    const handler = routes[method.toLowerCase()]
    if (handler) {
      const params = routes.path.parseParams(requestPath)
      if (params) return {params, handler}
    }
  }
}