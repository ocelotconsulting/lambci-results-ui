const { stackName } = require('../config')
const dynamoClient = require('./dynamoClient')
const projectExists = require('./projectExists')
const projectNotFound = require('./projectNotFound')
const createHandler = require('./createHandler')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 'project', 's3Bucket']

const toConfig = item =>
  fields.reduce((p, c) => {
    p[c] = item[c]
    return p
  }, {})

const getConfig = async projectId => {
  const { Items: [item] } = await dynamoClient.query({
    TableName: `${stackName}-config`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  const config = item && toConfig(item)
  if (config) {
    return config
  } else {
    const exists = await projectExists(projectId)
    return exists ? { project: projectId } : undefined
  }
}

module.exports = createHandler(
  async ({ params: { projectId } }, res) => {
    const config = await getConfig(projectId)
    if (config) {
      res.json(config)
    } else {
      projectNotFound(res, projectId)
    }
  }
)
