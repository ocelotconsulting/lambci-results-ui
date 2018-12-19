const endsWith = require('underscore.string/endsWith')
const querySingleBuild = require('./querySingleBuild')
const getBuildFile = require('./getBuildFile')

const getReport = (projectId, buildNum, files) => {
  const fileName = files.find(f => endsWith(f, '.html'))
  if (fileName) {
    return getBuildFile(projectId, buildNum, fileName)
  } else {
    return { status: 404, message: `build report missing for project ${projectId} build #${buildNum}` }
  }
}

module.exports = ({ params: { projectId, buildNum } }, res, next) =>
  querySingleBuild(projectId, buildNum)
  .then(({ build, status, message }) =>
    build ? getReport(projectId, buildNum, build.files) : { status, message }
  ).then(({ status, message, result }) =>
    result
      ? res.type(result.contentType).send(result.body)
      : res.status(status).send(message)
  ).catch(next)
