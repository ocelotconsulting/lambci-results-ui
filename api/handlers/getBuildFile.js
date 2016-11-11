const s3 = require('./s3')
const getResultsBucket = require('./getResultsBucket')

module.exports = ({params: {projectId, buildNumber, fileName}}, res, next) =>
  getResultsBucket()
  .then(bucket =>
    s3.getObject({
      Bucket: bucket,
      Key: `${projectId}/builds/${buildNumber}/${fileName}`
    }).promise()
    .then(({Body, ContentType}) => res.type(ContentType).send(Body))
    .catch(error => {
      if (error.statusCode === 404) {
        res.status(404).send(`file ${fileName} not found`)
      } else {
        throw error
      }
    })
  ).catch(next)
