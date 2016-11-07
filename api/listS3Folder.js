const s3 = require('./s3')
const sortBy = require('lodash/sortBy')
const last = require('lodash/last')
const moment = require('moment')

const lastSegment = path => last(path.split('/').filter(Boolean))

const toFile = ({Key, Size, LastModified}) => ({
  name: lastSegment(Key),
  size: Size,
  lastModified: LastModified
})

module.exports = (bucketId, folder) =>
  s3.listObjectsV2({Bucket: bucketId, Prefix: folder && `${folder}/`, Delimiter: '/'}).promise()
  .then(({Contents, CommonPrefixes}) => ({
    files: Contents.map(toFile),
    folders: CommonPrefixes.map(({Prefix}) => lastSegment(Prefix))
  }))
