const s3 = require('./s3')
const sortBy = require('lodash/sortBy')
const flatten = require('lodash/flatten')
const nth = require('lodash/nth')
const moment = require('moment')
const listS3Folder = require('./listS3Folder')

const findProjects = (bucketId, parentFolder, remainingDepth = 2) =>
  listS3Folder(bucketId, parentFolder)
  .then(({folders}) => {
    const ids = parentFolder ? folders.map(folder => `${parentFolder}/${folder}`) : folders
    return remainingDepth === 0 ?
      ids.map(id => ({id}))
      : Promise.all(ids.map(id => findProjects(bucketId, id, remainingDepth - 1))).then(flatten)
  })

const getBuildNumber = key => parseInt(nth(key.split('/'), -2), 10)

const addMetadata = (project, objects) => {
  let lastBuildTime = null
  let lastBuildNumber = null

  objects.forEach(({Key, LastModified}) => {
    const buildNumber = getBuildNumber(Key)
    if (buildNumber) {
      lastBuildNumber = Math.max(lastBuildNumber, buildNumber)
      if (lastBuildNumber === buildNumber) lastBuildTime = LastModified
    }
  })

  return Object.assign(project, {lastBuildNumber, lastBuildTime})
}

const sortProjects = projects => sortBy(projects, ({lastBuildTime = 0}) => moment(lastBuildTime).valueOf() * -1)

const findAll = bucketId => {
  const withMetadata = project =>
    s3.listObjectsV2({Bucket: bucketId, Prefix: `${project.id}/builds/`}).promise()
    .then(({Contents}) => addMetadata(project, Contents))

  return findProjects(bucketId)
  .then(projects => Promise.all(projects.map(withMetadata)).then(sortProjects))
}

module.exports = ({params: {bucketId}}, res, next) =>
  findAll(bucketId)
  .then(projects => res.json(projects))
  .catch(next)
