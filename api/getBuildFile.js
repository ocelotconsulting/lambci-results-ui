const s3 = require('./s3')

module.exports = ({params: {bucketId, projectId, buildNumber, fileName}}, res, next) =>
  s3.getObject({
    Bucket: bucketId,
    Key: `${projectId}/builds/${buildNumber}/${fileName}`
  }).promise()
  .then(({Body, ContentType}) => res.type(ContentType).send(Body))
  .catch(error => error.statusCode === 404 ? res.status(404).send('file not found') : Promise.reject(error))
