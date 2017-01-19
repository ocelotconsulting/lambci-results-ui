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
    path: '/projects/:projectId/build-updates',
    get: require('./handlers/getBuildUpdates')
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
    path: '/projects/:projectId/builds/:buildNum/report',
    get: require('./handlers/getBuildReport')
  }
]

routes.forEach(route => route.path = new Path(route.path))

module.exports = routes
