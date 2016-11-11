const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')
const listS3Folder = require('./listS3Folder')
const getResultsBucket = require('./getResultsBucket')
const map = require('lodash/map')
const sortBy = require('lodash/sortBy')

const getBuilds = (bucket, projectId) => {
  const withFiles = build =>
    listS3Folder(bucket, `${projectId}/builds/${build.buildNum}`)
    .then(({files}) => Object.assign(build, {files: map(files, 'name')}))

  return dynamoClient.query({
    TableName: `${stackName}-builds`,
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  .then(({Items}) => Promise.all(Items.filter(({buildNum}) => buildNum > 0).map(withFiles)))
  .then(items => sortBy(items, ({buildNum}) => -1 * buildNum))
}

module.exports = ({params: {projectId}}, res, next) =>
  getResultsBucket()
  .then(bucket => getBuilds(bucket, projectId))
  .then(items => res.json(items))
  .catch(next)
