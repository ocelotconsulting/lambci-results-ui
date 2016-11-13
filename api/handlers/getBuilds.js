const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')
const addBuildFiles = require('./addBuildFiles')
const getResultsBucket = require('./getResultsBucket')

const defaultPageSize = 20

const getBuilds = (bucket, projectId, lastBuildNum, pageSize) => {
  const exclusiveStartKey = lastBuildNum ? {
    ExclusiveStartKey: {
      project: projectId,
      buildNum: lastBuildNum
    }
  } : {}

  const parameters = Object.assign({
    TableName: `${stackName}-builds`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      },
      buildNum: {
        ComparisonOperator: 'GT',
        AttributeValueList: [0]
      }
    },
    ScanIndexForward: false,
    Limit: pageSize || defaultPageSize
  }, exclusiveStartKey)

  return dynamoClient.query(parameters).promise()
  .then(({Items}) =>
    Promise.all(Items.map(build => addBuildFiles(bucket, build)))
  )
}

const intParam = parameterValue => parameterValue && parseInt(parameterValue, 10)

module.exports = ({params: {projectId}, query: {lastBuildNum, pageSize}}, res, next) =>
  getResultsBucket()
  .then(bucket => getBuilds(bucket, projectId, intParam(lastBuildNum), intParam(pageSize)))
  .then(items => res.json(items))
  .catch(next)
