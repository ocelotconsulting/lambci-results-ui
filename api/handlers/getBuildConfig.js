const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 'project', 's3Bucket']

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
  .then(({Items: [item]}) => {
    if (item) {
      res.json(fields.reduce((p, c) => {
        p[c] = item[c]
        return p
      }, {}))
    } else {
      res.status(404).send(`Project ${projectId} not found`)
    }
  })
  .catch(next)
}
