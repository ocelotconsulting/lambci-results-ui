const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')
const listS3Folder = require('./listS3Folder')
const getResultsBucket = require('./getResultsBucket')
const map = require('lodash/map')
const sortBy = require('lodash/sortBy')

const defaultPageSize = 20

const getBuilds = (bucket, projectId, lastBuildNum, pageSize) => {
  const withFiles = build =>
    listS3Folder(bucket, `${projectId}/builds/${build.buildNum}`)
    .then(({files}) => Object.assign(build, {files: map(files, 'name')}))

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
        AttributeValueList: [
          0
        ]
      }
    },
    ScanIndexForward: false,
    Limit: pageSize || defaultPageSize
  }, exclusiveStartKey)

  return dynamoClient.query(parameters).promise()
  .then(({Items}) =>
    Promise.all(Items.map(withFiles))
  )
}

const parse = queryParameter => queryParameter && parseInt(queryParameter, 10)

module.exports = ({params: {projectId}, query: {lastBuildNum, pageSize}}, res, next) =>
  getResultsBucket()
  .then(bucket => getBuilds(bucket, projectId, parse(lastBuildNum), parse(pageSize)))
  .then(items => res.json(items))
  .catch(next)
