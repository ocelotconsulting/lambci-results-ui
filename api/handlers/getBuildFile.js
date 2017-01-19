const getS3File = require('./getS3File')
const getResultsBucket = require('./getResultsBucket')

module.exports = (projectId, buildNumber, fileName) =>
  getResultsBucket()
  .then(bucket =>
    getS3File(bucket, `${projectId}/builds/${buildNumber}/${fileName}`)
    .then(result => ({result}))
    .catch(error =>
      error.statusCode === 404 ? {status: 400, message: `file ${fileName} not found`} : Promise.reject(error)
    )
  )

