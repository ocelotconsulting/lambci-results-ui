const sortBy = require('lodash/sortBy')
const flatten = require('lodash/flatten')
const nth = require('lodash/nth')
const s3 = require('./s3')
const createHandler = require('./createHandler')
const mostRecent = require('./mostRecent')
const listS3Folder = require('./listS3Folder')
const getResultsBucket = require('./getResultsBucket')

const findProjects = async (bucket, parentFolder, remainingDepth = 2) => {
  const { folders } = await listS3Folder(bucket, parentFolder)
  const ids = parentFolder ? folders.map(folder => `${parentFolder}/${folder}`) : folders
  if (remainingDepth === 0) {
    return ids.map(id => ({ id }))
  } else {
    return flatten(await Promise.all(ids.map(id => findProjects(bucket, id, remainingDepth - 1))))
  }
}

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

const findAll = async bucket => {
  const withMetadata = async project => {
    const { Contents } = await s3.listObjectsV2({ Bucket: bucket, Prefix: `${project.id}/builds/` }).promise()
    return addMetadata(project, Contents)
  }

  const rawProjects = await findProjects(bucket)
  const projects = await Promise.all(rawProjects.map(withMetadata))

  return sortBy(projects, mostRecent('lastTimestamp'))
}

module.exports = createHandler(
  async (req, res) => {
    const bucket = await getResultsBucket()
    const projects = await findAll(bucket)
    res.json(projects)
  }
)
