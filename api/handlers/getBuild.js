const {stackName} = require('./../config')
const dynamoClient = require('./dynamoClient')
const addBuildFiles = require('./addBuildFiles')
const getResultsBucket = require('./getResultsBucket')

const getBuild = (projectId, buildNum) =>
  Promise.all([
    getResultsBucket(),
    dynamoClient.query({
      TableName: `${stackName}-builds`,
      KeyConditions: {
        project: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [projectId]
        },
        buildNum: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [buildNum]
        }
      }
    }).promise()
  ])
  .then(([bucket, {Items: [build]}]) => build && addBuildFiles(bucket, build))

module.exports = ({params: {projectId, buildNum}}, res, next) => {
  const parsedBuildNum = parseInt(buildNum, 10)
  if (parsedBuildNum > 0) {
    getBuild(projectId, parsedBuildNum)
    .then(build => {
      if (build) {
        res.json(build)
      } else {
        res.status(404).send(`Project '${projectId}' build #${buildNum} was not found`)
      }
    })
    .catch(next)
  } else {
    res.status(400).send(`Invalid build number: ${buildNum}`)
  }
}
