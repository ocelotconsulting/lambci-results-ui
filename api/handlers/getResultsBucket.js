const { stackName } = require('../config')

const dynamoClient = require('./dynamoClient')

module.exports = async () => {
  const { Items: [item] } = await dynamoClient.query({
    TableName: `${stackName}-config`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: ['global']
      }
    }
  }).promise()
  const s3Bucket = item && item.s3Bucket

  if (s3Bucket) {
    return s3Bucket
  } else {
    throw new Error(`Unable to find configuration for lambci stack ${stackName}`)
  }
}
