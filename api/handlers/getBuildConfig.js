const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 'project', 's3Bucket']

const toConfig = item =>
  fields.reduce((p, c) => {
    p[c] = item[c]
    return p
  }, {})

module.exports = ({params: {projectId}}, res, next) => {
  return dynamoClient.query({
    TableName: `${stackName}-config`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  .then(({Items: [item]}) =>
    res.json((item && toConfig(item)) || {project: projectId})
  )
  .catch(next)
}
