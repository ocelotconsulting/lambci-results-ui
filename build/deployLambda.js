const fs = require('fs')
const archiver = require('archiver')
const AWS = require('../api/aws')

const zipFilename = 'dist/lambda.zip'

const createArchive = () => new Promise((resolve, reject) => {
  if (fs.existsSync(zipFilename)) fs.unlinkSync(zipFilename)

  const output = fs.createWriteStream(zipFilename)

  output.on('finish', () => {
    if (fs.existsSync(zipFilename)) {
      console.log(`${zipFilename} created`)
      resolve()
    } else {
      reject(new Error(`${zipFilename} was not found`))
    }
  })

  const zipfile = archiver('zip')
  zipfile.on('error', reject)
  zipfile.pipe(output)
  zipfile.append(fs.createReadStream('dist/index.js'), {name: 'index.js'})
  zipfile.finalize()
})

const updateLambdaFunction = () => {
  const lambdaFunctionName = process.env.API_LAMBDA_FUNCTION_NAME || 'lambci-ui-api'

  const lambda = new AWS.Lambda()

  return lambda.updateFunctionCode({
    FunctionName: lambdaFunctionName,
    ZipFile: fs.readFileSync(zipFilename),
    Publish: true
  }).promise()
}

createArchive()
.then(updateLambdaFunction)
.then(result => {
  console.log(JSON.stringify(result))
  console.log('successfully deployed lambda function')
  process.exit(0)
})
.catch(error => {
  if (error.stack) console.error(error.stack)
  console.error(`lambda deployment failed! ${error.message}`)
  process.exit(1)
})


