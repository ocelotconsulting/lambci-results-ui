import proxyquire from '../proxyquire'
import { SELECT_PROJECT, GET_BUILDS } from '../../src/actions/types'

describe('getBuilds', () => {
  let maybeRefresh, http, projectId, dispatch, state, getBuilds

  beforeEach(async () => {
    maybeRefresh = sinon.stub()
    http = {
      get: sinon.stub().resolves()
    }
    dispatch = sinon.stub()
    projectId = 'project 1'
    state = { x: 1 }
    getBuilds = proxyquire('src/actions/getBuilds', {
      './maybeRefresh': maybeRefresh,
      './http': http
    }).default
    const thunk = getBuilds(projectId)
    await thunk(dispatch, () => state)
  })

  it('selects project', () =>
    dispatch.should.have.been.calledWithExactly({ type: SELECT_PROJECT, projectId })
  )

  it('gets projects using project path', () =>
    http.get.should.have.been.calledWithExactly(
      dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`
    )
  )

  it('delegates to maybeRefresh', () => {
    maybeRefresh.should.have.been.calledWithExactly({ projectId, state, dispatch })
  })
})
