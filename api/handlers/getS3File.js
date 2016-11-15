const s3 = require('./s3')
const mimeTypes = require('mime-types')

module.exports = (bucket, key) =>
  s3.getObject({
    Bucket: bucket,
    Key: key
  }).promise()
  .then(({Body, ContentType}) => {
    const encoding = mimeTypes.charset(ContentType)
    return {
      contentType: ContentType,
      body: encoding ? Body.toString(encoding) : Body
    }
  })