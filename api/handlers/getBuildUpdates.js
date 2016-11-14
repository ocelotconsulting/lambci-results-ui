const queryBuilds = require('./queryBuilds')
const sortBy = require('lodash/sortBy')
const compact = require('lodash/compact')

const defaultBuildParams = (projectId, buildNum, operator = 'EQ') => ({
  KeyConditions: {
    project: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [projectId]
    },
    buildNum: {
      ComparisonOperator: operator,
      AttributeValueList: [buildNum]
    }
  }
})

const newBuildsParams = (projectId, lastBuildNum) => defaultBuildParams(projectId, lastBuildNum, 'GT')

const updateAttributes = ['buildNum', 'endedAt', 'status']

const updateBuildParams = (projectId, buildNum) =>
  Object.assign({AttributesToGet: updateAttributes}, defaultBuildParams(projectId, buildNum))

const parseQuery = query => {
  const lastBuildNum = parseInt(query.lastBuildNum, 10)
  const buildNums = (query.buildNums && query.buildNums.split(',').map(n => parseInt(n, 10))) || []

  if (!(lastBuildNum >= 0)) {
    return {
      error: `Query parameter 'lastBuildNum' must be a non-negative number; was ${query.lastBuildNum}`
    }
  } else if (!buildNums.every(n => n > 0)) {
    return {
      error: `Optional query parameter 'buildNums' must be a CSV of positive integers; was ${query.buildNums}`
    }
  } else {
    return {lastBuildNum, buildNums}
  }
}

// we could do a single query with BETWEEN
// but typically a single build is running at one time and this algorithm is a lot simpler
const getUpdates = (projectId, buildNums) =>
  Promise.all(buildNums.map(buildNum =>
      queryBuilds({
        parameters: updateBuildParams(projectId, buildNum),
        includeFiles: false
      })
      .then(([build]) => build)
    )
  ).then(compact) // builds should not be deleted but it seems standard to tolerate query params that don't exist

const getNewBuilds = (projectId, lastBuildNum) =>
  queryBuilds({parameters: newBuildsParams(projectId, lastBuildNum)})

module.exports = ({query, params: {projectId}}, res, next) => {
  const {error, lastBuildNum, buildNums} = parseQuery(query)
  if (error) {
    res.status(400).send(error)
  } else {
    Promise.all([
      getUpdates(projectId, buildNums),
      getNewBuilds(projectId, lastBuildNum)
    ])
    .then(([updates, newBuilds]) =>
      res.json(sortBy(updates.concat(newBuilds), ({buildNum}) => -1 * buildNum))
    )
    .catch(next)
  }
}