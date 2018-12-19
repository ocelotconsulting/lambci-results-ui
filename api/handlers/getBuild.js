const querySingleBuild = require('./querySingleBuild')

module.exports = ({ params: { projectId, buildNum } }, res) =>
  querySingleBuild(projectId, buildNum)
  .then(({ status, message, build }) =>
    status ? res.status(status).send(message) : res.json(build)
  )
