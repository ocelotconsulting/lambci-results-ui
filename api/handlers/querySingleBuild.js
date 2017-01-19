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

module.exports = (projectId, buildNum) => {
  const parsedBuildNum = parseInt(buildNum, 10)
  if (parsedBuildNum > 0) {
    return queryBuilds({parameters: getParams(projectId, parsedBuildNum)})
    .then(([build]) =>
      build ?
        {build} :
        {
          status: 404,
          message: `Project '${projectId}' build #${buildNum} was not found`
        }
    )
  } else {
    return Promise.resolve({
      status: 400,
      message: `Invalid build number: ${buildNum}`
    })
  }
}
