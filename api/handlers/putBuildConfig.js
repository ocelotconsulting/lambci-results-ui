const { stackName } = require('../config')
const dynamoClient = require('./dynamoClient')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 's3Bucket']

module.exports = ({ body, params: { projectId } }, res, next) => {
  const toUpdate = Object.keys(body).filter((key) => fields.indexOf(key) >= 0)
  const updateExpression = 'SET ' + toUpdate.map((field, i) => `${field} = :f${i}`).join(', ')
  const expressionAttributes = toUpdate.reduce((p, c, i) => {
    p[`:f${i}`] = body[c]
    return p
  }, {})

  dynamoClient.update({
    TableName: `${stackName}-config`,
    Key: {
      project: projectId
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributes
  }).promise().then(() => {
    res.json({ message: 'ok' })
  }).catch(next)
}
