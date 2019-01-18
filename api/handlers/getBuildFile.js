const getS3File = require('./getS3File')
const getResultsBucket = require('./getResultsBucket')

module.exports = async (projectId, buildNumber, fileName) => {
  try {
    const bucket = await getResultsBucket()
    const result = await getS3File(bucket, `${projectId}/builds/${buildNumber}/${fileName}`)
    return { result }
  } catch (error) {
    if (error.statusCode === 404) {
      return { status: 400, message: `file ${fileName} not found` }
    } else {
      throw error
    }
  }
}
