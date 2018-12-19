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

const getBuilds = (projectId, query) =>
  queryBuilds({
    parameters: getParams(projectId, parseQueryParams(query))
  })
  .then(builds =>
    builds.length ? builds : projectExists(projectId).then(exists => exists && [])
  )

module.exports = ({ params: { projectId }, query }, res, next) =>
  getBuilds(projectId, query)
  .then(builds =>
    builds ? res.json(builds) : projectNotFound(res, projectId)
  )
  .catch(next)
