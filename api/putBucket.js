const s3 = require('./s3')
const {configJsonKey} = require('./config')

module.exports = ({params: {bucketId}, body}, res, next) =>
  s3.putObject({
    Bucket: bucketId,
    Key: configJsonKey,
    ContentType: 'application/json',
    Body: JSON.stringify(body)
  }).promise()
  .then(() => res.json({ok: true}))
  .catch(error => {
    if (error.statusCode === 404) {
      res.status(404).send(`bucket not found: ${bucketId}`)
    } else {
      next(error)
    }
  })