const s3 = require('./s3')
const getS3File = require('./getS3File')
const getResultsBucket = require('./getResultsBucket')

module.exports = ({params: {projectId, buildNumber, fileName}}, res, next) =>
  getResultsBucket()
  .then(bucket =>
    getS3File(bucket, `${projectId}/builds/${buildNumber}/${fileName}`)
    .then(({body, contentType}) => res.type(contentType).send(body))
    .catch(error => {
      if (error.statusCode === 404) {
        res.status(404).send(`file ${fileName} not found`)
      } else {
        throw error
      }
    })
  ).catch(next)
