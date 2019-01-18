const fs = require('fs')
const path = require('path')
const AWS = require('../api/aws')
const s3 = new AWS.S3()
const flatten = require('lodash/flatten')
const reject = require('lodash/reject')
const mimeTypes = require('mime-types')

const requireEnv = (name) => {
  const value = process.env[name]
  if (value) {
    return value
  } else {
    console.error(`Missing ${name} environment variable`)
    process.exit(1)
  }
}
const bucket = requireEnv('LAMBCI_UI_BUCKET')
requireEnv('API_URL')

const contentTypeHeaders = mimeType => {
  const charset = mimeTypes.charset(mimeType)
  return Object.assign({ ContentType: mimeType }, charset ? { ContentEncoding: charset } : undefined)
}

const fileName = (relativePath) => path.join(...(['public'].concat(relativePath)))

const uploadFile = async key => {
  const result = await s3.putObject(
    Object.assign({
      Bucket: bucket,
      Key: key,
      Body: fs.readFileSync(fileName(key.split('/')))
    }, contentTypeHeaders(mimeTypes.lookup(key)))
  ).promise()
  console.log(result)
}

const readDirectory = parentPath => {
  const contents = fs.readdirSync(fileName(parentPath))
  const isDirectory = f => fs.lstatSync(fileName(parentPath.concat(f))).isDirectory()
  return {
    files: reject(contents, isDirectory),
    directories: contents.filter(isDirectory)
  }
}

const getAllKeys = (parentPath = []) => {
  const { files, directories } = readDirectory(parentPath)
  const toKey = file => parentPath.concat(file).join('/')
  const toDirectoryKeys = directory => getAllKeys(parentPath.concat(directory))

  return files.map(toKey).concat(flatten(directories.map(toDirectoryKeys)))
}

const allKeys = getAllKeys()

const deploy = async () => {
  try {
    await Promise.all(allKeys.map(uploadFile))
    console.log(`Uploaded ${allKeys.length} files to S3`)
    process.exit(0)
  } catch (error) {
    if (error.stack) console.error(error.stack)
    console.error(error.message || JSON.stringify(error))
    console.log('S3 upload failed!')
    process.exit(1)
  }
}

deploy()
