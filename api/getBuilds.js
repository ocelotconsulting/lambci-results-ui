const dynamoClient = require('./dynamoClient')
const listS3Folder = require('./listS3Folder')
const map = require('lodash/map')
const sortBy = require('lodash/sortBy')

module.exports = ({params: {bucketId, projectId}}, res, next) => {
  const withFiles = build =>
    listS3Folder(bucketId, `${projectId}/builds/${build.buildNum}`)
    .then(({files}) => Object.assign(build, {files: map(files, 'name')}))

  return dynamoClient.query({
    TableName: 'lambci-builds',
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      }
    }
  }).promise()
  .then(({Items}) => Promise.all(Items.filter(({buildNum}) => buildNum > 0).map(withFiles)))
  .then(items => res.json(sortBy(items, ({buildNum}) => -1 * buildNum)))
  .catch(next)
}
