const createHandler = require('./createHandler')
const querySingleBuild = require('./querySingleBuild')
const getBuildFile = require('./getBuildFile')

const getReport = async (projectId, buildNum) => {
  const buildResult = await querySingleBuild(projectId, buildNum)
  if (buildResult.status) {
    return buildResult
  } else {
    const { build: { files } } = buildResult
    const fileName = files.find(f => f.endsWith('.html'))
    if (fileName) {
      return getBuildFile(projectId, buildNum, fileName)
    } else {
      return { status: 404, message: `build report missing for project ${projectId} build #${buildNum}` }
    }
  }
}

module.exports = createHandler(
  async ({ params: { projectId, buildNum } }, res) => {
    const { result, status, message } = await getReport(projectId, buildNum)
    if (result) {
      res.type(result.contentType).send(result.body)
    } else {
      res.status(status).json({ message })
    }
  }
)
