const { stackName } = require('../config')
const dynamoClient = require('./dynamoClient')
const projectExists = require('./projectExists')
const projectNotFound = require('./projectNotFound')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 'project', 's3Bucket']

const toConfig = item =>
  fields.reduce((p, c) => {
    p[c] = item[c]
    return p
  }, {})

const getConfig = projectId =>
  dynamoClient.query({
    TableName: `${stackName}-config`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  .then(({ Items: [item] }) =>
    (item && toConfig(item)) || projectExists(projectId).then(exists => exists && ({ project: projectId }))
  )

module.exports = ({ params: { projectId } }, res, next) =>
  getConfig(projectId)
  .then(config => config ? res.json(config) : projectNotFound(res, projectId))
  .catch(next)
