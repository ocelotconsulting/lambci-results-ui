const queryBuilds = require('./queryBuilds')

module.exports = async projectId => {
  const results = await queryBuilds({
    parameters: {
      AttributesToGet: ['project'],
      KeyConditions: {
        project: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [projectId]
        },
        buildNum: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [0]
        }
      }
    },
    includeFiles: false
  })
  return results.length > 0
}
