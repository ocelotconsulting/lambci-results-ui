const listS3Folder = require('./listS3Folder')
const map = require('lodash/map')

module.exports = (bucket, build) =>
  listS3Folder(bucket, `${build.project}/builds/${build.buildNum}`)
  .then(({files}) => Object.assign(build, {files: map(files, 'name')}))
