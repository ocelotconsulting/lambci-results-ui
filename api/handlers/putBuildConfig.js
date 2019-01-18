const { stackName } = require('../config')
const createHandler = require('./createHandler')
const dynamoClient = require('./dynamoClient')

const fields = ['branches', 'build', 'cmd', 'env', 'notifications', 's3Bucket']

module.exports = createHandler(
  async ({ body, params: { projectId } }, res) => {
    const toUpdate = Object.keys(body).filter((key) => fields.indexOf(key) >= 0)
    const updateExpression = 'SET ' + toUpdate.map((field, i) => `${field} = :f${i}`).join(', ')
    const expressionAttributes = toUpdate.reduce((p, c, i) => {
      p[`:f${i}`] = body[c]
      return p
    }, {})

    await dynamoClient.update({
      TableName: `${stackName}-config`,
      Key: {
        project: projectId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributes
    }).promise()
    res.json({ message: 'ok' })
  }
)
