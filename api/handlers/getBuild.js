const queryBuilds = require('./queryBuilds')

const getParams = (projectId, buildNum) => ({
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
})

module.exports = ({params: {projectId, buildNum}}, res, next) => {
  const parsedBuildNum = parseInt(buildNum, 10)
  if (parsedBuildNum > 0) {
    queryBuilds({parameters: getParams(projectId, parsedBuildNum)})
    .then(([build]) => {
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
