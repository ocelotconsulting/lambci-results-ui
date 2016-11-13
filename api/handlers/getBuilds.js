const queryBuilds = require('./queryBuilds')

const defaultPageSize = 20

const intParam = parameterValue => parameterValue && parseInt(parameterValue, 10)

const parseQueryParams = ({lastBuildNum, pageSize}) => ({
  lastBuildNum: intParam(lastBuildNum),
  pageSize: intParam(pageSize)
})

const getParams = (projectId, {lastBuildNum, pageSize}) => Object.assign(
  {
    KeyConditions: {
      project: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [projectId]
      },
      buildNum: {
        ComparisonOperator: 'GT',
        AttributeValueList: [lastBuildNum]
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

module.exports = ({params: {projectId}, query}, res, next) =>
  queryBuilds({
    parameters: getParams(projectId, parseQueryParams(query))
  })
  .then(builds => res.json(builds))
  .catch(next)

