const {dynamoTablePrefix} = require('./config')
const dynamoClient = require('./dynamoClient')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 'project', 's3Bucket']

module.exports = ({params: {projectId}}, res, next) => {
  return dynamoClient.query({
    TableName: `${dynamoTablePrefix}-config`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  .then(items => items.Items.map(item => fields.reduce((p,c) => {
    p[c] = item[c];
    return p
  }, {})))
  .then(items => items.length == 1 ? res.json(items[0]) : res.status(404).send())
}
