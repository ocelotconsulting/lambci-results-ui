const createHandler = require('./createHandler')
const queryBuilds = require('./queryBuilds')
const projectExists = require('./projectExists')
const projectNotFound = require('./projectNotFound')

const defaultPageSize = 20

const intParam = parameterValue => parameterValue && parseInt(parameterValue, 10)

const parseQueryParams = ({ lastBuildNum, pageSize }) => ({
  lastBuildNum: intParam(lastBuildNum),
  pageSize: intParam(pageSize)
})

const getParams = (projectId, { lastBuildNum, pageSize }) => Object.assign(
  {
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      },
      buildNum: {
        ComparisonOperator: 'GT',
        AttributeValueList: [0]
      }
    },
    ScanIndexForward: false,
    Limit: pageSize || defaultPageSize
  },
  lastBuildNum ? {
    ExclusiveStartKey: {
      project: projectId,
      buildNum: lastBuildNum
    }
  } : {}
)

const getBuilds = async (projectId, query) => {
  const builds = await queryBuilds({
    parameters: getParams(projectId, parseQueryParams(query))
  })
  if (builds.length > 0) {
    return builds
  } else {
    const exists = await projectExists(projectId)
    return exists ? [] : undefined
  }
}

module.exports = createHandler(
  async ({ params: { projectId }, query }, res) => {
    const builds = await getBuilds(projectId, query)
    if (builds) {
      res.json(builds)
    } else {
      projectNotFound(res, projectId)
    }
  }
)
