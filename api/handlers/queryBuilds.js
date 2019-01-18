const map = require('lodash/map')
const { stackName } = require('../config')
const dynamoClient = require('./dynamoClient')
const getResultsBucket = require('./getResultsBucket')
const listS3Folder = require('./listS3Folder')

const addBuildFiles = async (bucket, build) => {
  const { files } = await listS3Folder(bucket, `${build.project}/builds/${build.buildNum}`)
  return {
    ...build,
    files: map(files, 'name')
  }
}

const tableParameter = { TableName: `${stackName}-builds` }

module.exports = async ({ parameters, includeFiles }) => {
  const [{ Items }, bucket] = await Promise.all([
    dynamoClient.query(Object.assign({}, tableParameter, parameters)).promise(),
    ...(includeFiles === false ? [] : [getResultsBucket()])
  ])
  if (bucket) {
    return Promise.all(Items.map(build => addBuildFiles(bucket, build)))
  } else {
    return Items
  }
}
