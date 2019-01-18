import maxBy from 'lodash/maxBy'
import map from 'lodash/map'
import { REFRESH_BUILDS } from './types'
import agent from 'superagent'
import queryString from 'query-string'
import { apiBaseUrl } from '../config'

export default (projectId, next) =>
  async (dispatch, getState) => {
    const isEnabled = () => {
      const { builds, projects } = getState()
      return builds.refresh.enabled && builds.value && projectId === projects.selected.id
    }

    const builds = getState().builds.value

    const buildNums = map(builds.filter(build => build.status === 'pending'), 'buildNum').join(',')

    const lastBuild = maxBy(builds, 'buildNum')

    const query = {
      lastBuildNum: (lastBuild && lastBuild.buildNum) || 0,
      buildNums: buildNums || undefined
    }

    try {
      const { body } = await agent.get(
        `${apiBaseUrl}/projects/${encodeURIComponent(projectId)}/build-updates?${queryString.stringify(query)}`
      )
      if (isEnabled()) {
        dispatch({ type: REFRESH_BUILDS, result: body })
        next()
      }
    } catch (_) {
      // ignore the error and retry if appropriate
      if (isEnabled()) {
        next()
      }
    }
  }
