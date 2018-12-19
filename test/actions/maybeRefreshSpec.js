import proxyquire from '../proxyquire'

describe('maybeRefresh', () => {
  let refreshBuildsLater, maybeRefresh, projectId, state, dispatch

  beforeEach(() => {
    refreshBuildsLater = sinon.stub().returns({ type: 'refreshBuildsLater' })
    maybeRefresh = proxyquire('src/actions/maybeRefresh', {
      './refreshBuildsLater': refreshBuildsLater
    }).default
    dispatch = sinon.stub()
    projectId = 'project1'
    state = {
      builds: {
        value: [],
        paging: {
          page: 1
        }
      },
      projects: {
        selected: {
          id: projectId
        }
      }
    }
  })

  const apply = () => {
    maybeRefresh({ projectId, state, dispatch })
    if (dispatch.callCount === 0) {
      return false
    } else {
      dispatch.should.have.been.calledWithExactly(refreshBuildsLater())
      return true
    }
  }

  it('does not refresh if page > 1', () => {
    state.builds.paging.page = 2
    apply().should.be.false
  })

  it('does not refresh if builds are not retrieved', () => {
    state.builds.value = undefined
    apply().should.be.false
  })

  it('does not refresh if selected project has changed', () => {
    state.projects.selected.id = 'something else'
    apply().should.be.false
  })

  it('refreshes if other conditions do not apply', () => apply().should.be.true)
})
