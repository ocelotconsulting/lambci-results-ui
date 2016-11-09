const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const {region} = require('./config')

AWS.config.update({region})

const root = express.Router()
const buckets = express.Router()
const config = express.Router()

root.use(bodyParser.json())
root.use('/buckets', buckets)
root.use('/configs', config)

buckets.get('/', require('./getBuckets'))
buckets.put('/:bucketId', require('./putBucket'))
buckets.get('/:bucketId/projects', require('./getProjects'))
buckets.get('/:bucketId/projects/:projectId/builds', require('./getBuilds'))
buckets.get('/:bucketId/projects/:projectId/builds/:buildNumber/:fileName', require('./getBuildFile'))

config.get('/:projectId', require('./getBuildConfig'))

root.use('/*', ({method, originalUrl}, res) => res.status(404).send(`Cannot ${method} ${originalUrl}`))

module.exports = root
