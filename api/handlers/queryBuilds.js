const map = require('lodash/map')
const compact = require('lodash/compact')
const {stackName} = require('../config')
const dynamoClient = require('./dynamoClient')
const getResultsBucket = require('./getResultsBucket')
const listS3Folder = require('./listS3Folder')

const addBuildFiles = (bucket, build) =>
  listS3Folder(bucket, `${build.project}/builds/${build.buildNum}`)
  .then(({files}) =>
    Object.assign(build, {files: map(files, 'name')})
  )

const tableParameter = {TableName: `${stackName}-builds`}

module.exports = ({parameters, includeFiles}) =>
  Promise.all(compact([
    dynamoClient.query(Object.assign({}, tableParameter, parameters)).promise(),
    includeFiles !== false && getResultsBucket()
  ]))
  .then(([{Items}, bucket]) =>
    bucket ? Promise.all(Items.map(build => addBuildFiles(bucket, build))) : Items
  )
