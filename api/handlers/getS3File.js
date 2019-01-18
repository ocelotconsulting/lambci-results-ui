const s3 = require('./s3')
const mimeTypes = require('mime-types')

module.exports = async (bucket, key) => {
  const { Body, ContentType } = await s3.getObject({
    Bucket: bucket,
    Key: key
  }).promise()
  const encoding = mimeTypes.charset(ContentType)
  return {
    contentType: ContentType,
    body: encoding ? Body.toString(encoding) : Body
  }
}
