const s3 = require('./s3')
const listS3Folder = require('./listS3Folder')
const compact = require('lodash/compact')

const buildsFolder = 'builds'

const getBuild = (bucketId, projectId, folder) => {
  const buildNumber = parseInt(folder, 10)
  if (buildNumber) {
    return listS3Folder(bucketId, `${projectId}/${buildsFolder}/${buildNumber}`)
    .then(({files}) => files.length === 1 && {buildNumber, fileName: files[0].name, timestamp: files[0].lastModified})
  } else {
    return Promise.resolve()
  }
}

module.exports = ({params: {bucketId, projectId}}, res, next) =>
  listS3Folder(bucketId, `${projectId}/${buildsFolder}`)
  .then(({folders}) => Promise.all(folders.map(folder => getBuild(bucketId, projectId, folder))).then(compact))
  .then(builds => res.json(builds))
  .catch(next)