const s3 = require('./s3')
const map = require('lodash/map')
const {configJsonKey} = require('./config')

const getBucket = id => s3.getObject({Bucket: id, Key: configJsonKey}).promise()
  .then(({Body}) => Object.assign(JSON.parse(Body), {id}))
  .catch(error => error.statusCode === 404 ? {id, name: id} : Promise.reject(error))

const nameRegex = /lambci-(.*)/

const getMatchingBucketIds = buckets => map(buckets, 'Name').filter(id => nameRegex.exec(id))

module.exports = (req, res, next) =>
  s3.listBuckets().promise()
  .then(({Buckets}) => Promise.all(getMatchingBucketIds(Buckets).map(getBucket)))
  .then(buckets => res.json(buckets))
  .catch(next)
