import mocks from '../mocks'
import {SELECT_PROJECT, GET_BUILDS} from '../../src/actions/types'

describe('getBuilds', () => {
  let maybeRefresh, http, projectId, dispatch, state, getBuilds

  beforeEach(() => {
    maybeRefresh = sinon.stub()
    http = {
      get: sinon.stub().resolves()
    }
    mocks.enable({
      './maybeRefresh': maybeRefresh,
      './http': http
    })
    dispatch = sinon.stub()
    projectId = 'project 1'
    state = {x: 1}
    getBuilds = require('../../src/actions/getBuilds').default
    const thunk = getBuilds(projectId)
    return thunk(dispatch, () => state)
  })

  afterEach(() => {
    mocks.disable()
  })


  it('selects project', () =>
    dispatch.should.have.been.calledWithExactly({type: SELECT_PROJECT, projectId})
  )

  it('gets projects using project path', () =>
    http.get.should.have.been.calledWithExactly(
      dispatch, GET_BUILDS, `projects/${encodeURIComponent(projectId)}/builds`
    )
  )

  it('delegates to maybeRefresh', () => {
    maybeRefresh.should.have.been.calledWithExactly({projectId, state, dispatch})
  })
})
