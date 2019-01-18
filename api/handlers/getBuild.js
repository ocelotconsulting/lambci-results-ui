const createHandler = require('./createHandler')
const querySingleBuild = require('./querySingleBuild')

module.exports = createHandler(
  async ({ params: { projectId, buildNum } }, res) => {
    const { status, message, build } = await querySingleBuild(projectId, buildNum)
    if (status) {
      res.status(status).json({ message })
    } else {
      res.json(build)
    }
  }
)
