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

module.exports = async (projectId, buildNum) => {
  const parsedBuildNum = parseInt(buildNum, 10)
  if (parsedBuildNum > 0) {
    const [build] = await queryBuilds({ parameters: getParams(projectId, parsedBuildNum) })
    return build ? { build } : { status: 404, message: `Project '${projectId}' build #${buildNum} was not found` }
  } else {
    return {
      status: 400,
      message: `Invalid build number: ${buildNum}`
    }
  }
}
