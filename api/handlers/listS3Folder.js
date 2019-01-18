const s3 = require('./s3')
const last = require('lodash/last')

const lastSegment = path => last(path.split('/').filter(Boolean))

const toFile = ({ Key, Size, LastModified }) => ({
  name: lastSegment(Key),
  size: Size,
  lastModified: LastModified
})

module.exports = async (bucket, folder) => {
  const { Contents, CommonPrefixes } = await s3.listObjectsV2({
    Bucket: bucket,
    Prefix: folder && `${folder}/`,
    Delimiter: '/'
  }).promise()
  return {
    files: Contents.map(toFile),
    folders: CommonPrefixes.map(({ Prefix }) => lastSegment(Prefix))
  }
}
