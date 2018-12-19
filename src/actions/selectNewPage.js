import queryString from 'query-string'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import { SET_BUILD_PAGE, GET_BUILDS } from './types'
import http from './http'
import maybeRefresh from './maybeRefresh'

const buildQuery = (builds, pageSize, delta) => {
  const lastBuildNum = delta < 0 ? maxBy(builds, 'buildNum').buildNum + pageSize + 1 : minBy(builds, 'buildNum').buildNum
  return `?${queryString.stringify({ lastBuildNum })}`
}

export default delta =>
  (dispatch, getState) => {
    const { builds: { paging: { page, pageSize }, value: builds, refresh: { timeoutId } }, projects: { selected } } = getState()

    // if refreshing kill it
    if (timeoutId) clearTimeout(timeoutId)

    const newPage = page + delta

    dispatch({ type: SET_BUILD_PAGE, value: newPage })
    const projectId = selected.id

    const query = newPage === 1 ? '' : buildQuery(builds, pageSize, delta)
    http.get(dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds${query}`)
    .then(() => {
      maybeRefresh({ projectId, state: getState(), dispatch })
    })
  }
