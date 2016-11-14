import maxBy from 'lodash/maxBy'
import map from 'lodash/map'
import {REFRESH_BUILDS} from './types'
import encode from '../encode'
import agent from '../agent'
import queryString from 'query-string'


export default (refreshBuildsLater, projectId) =>
  (dispatch, getState) => {
    const isEnabled = () => {
      const {builds, projects} = getState()
      return builds.refresh.enabled && builds.value && projectId === projects.selected.id
    }

    const next = () => dispatch(refreshBuildsLater())

    const builds = getState().builds.value

    const buildNums = map(builds.filter(build => build.status === 'pending'), 'buildNum').join(',')

    const lastBuild = maxBy(builds, 'buildNum')

    const query = {
      lastBuildNum: (lastBuild && lastBuild.buildNum) || 0,
      buildNums: buildNums || undefined
    }

    agent.get(`/api/projects/${encode(projectId)}/build-updates?${queryString.stringify(query)}`)
    .then(({body}) => {
      if (isEnabled()) {
        dispatch({type: REFRESH_BUILDS, result: body})
        next()
      }
    })
    .catch(() => isEnabled() && next()) // ignore the error and retry if appropriate
  }
