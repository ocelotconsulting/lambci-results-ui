const Path = require('./Path')

const routes = [
  {
    path: '/projects',
    get: require('./handlers/getProjects')
  },
  {
    path: '/projects/:projectId/builds',
    get: require('./handlers/getBuilds')
  },
  {
    path: '/projects/:projectId/builds/:buildNum',
    get: require('./handlers/getBuild')
  },
  {
    path: '/projects/:projectId/config',
    get: require('./handlers/getBuildConfig'),
    put: require('./handlers/putBuildConfig')
  },
  {
    path: '/projects/:projectId/builds/:buildNumber/:fileName',
    get: require('./handlers/getBuildFile')
  }
]

routes.forEach(route => route.path = new Path(route.path))

module.exports = routes
