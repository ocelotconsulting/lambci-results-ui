const sortBy = require('lodash/sortBy')
const flatten = require('lodash/flatten')
const nth = require('lodash/nth')
const s3 = require('./s3')
const mostRecent = require('./mostRecent')
const listS3Folder = require('./listS3Folder')
const getResultsBucket = require('./getResultsBucket')

const findProjects = (bucket, parentFolder, remainingDepth = 2) =>
  listS3Folder(bucket, parentFolder)
  .then(({ folders }) => {
    const ids = parentFolder ? folders.map(folder => `${parentFolder}/${folder}`) : folders
    return remainingDepth === 0
      ? ids.map(id => ({ id }))
      : Promise.all(ids.map(id => findProjects(bucket, id, remainingDepth - 1))).then(flatten)
  })

const getBuildNumber = key => parseInt(nth(key.split('/'), -2), 10)

const addMetadata = (project, objects) => {
  let lastTimestamp = null
  let lastBuildNumber = null

  objects.forEach(({ Key, LastModified }) => {
    const buildNumber = getBuildNumber(Key)
    if (buildNumber) {
      lastBuildNumber = Math.max(lastBuildNumber, buildNumber)
      if (lastBuildNumber === buildNumber) lastTimestamp = LastModified
    }
  })

  return Object.assign(project, { lastBuildNumber, lastTimestamp })
}

const sortProjects = projects => sortBy(projects, mostRecent('lastTimestamp'))

const findAll = bucket => {
  const withMetadata = project =>
    s3.listObjectsV2({ Bucket: bucket, Prefix: `${project.id}/builds/` }).promise()
    .then(({ Contents }) => addMetadata(project, Contents))

  return findProjects(bucket)
  .then(projects => Promise.all(projects.map(withMetadata)).then(sortProjects))
}

module.exports = (req, res, next) =>
  getResultsBucket()
  .then(findAll)
  .then(projects => res.json(projects))
  .catch(next)
