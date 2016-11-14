const queryBuilds = require('./queryBuilds')

module.exports = projectId =>
  queryBuilds({
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
  .then(results => results.length > 0)
