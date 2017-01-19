import refreshBuilds from '../../src/actions/refreshBuilds'
import {REFRESH_BUILDS} from '../../src/actions/types'
import agent from 'superagent'
import {apiBaseUrl} from '../../src/config'

describe('refreshBuilds', () => {
  let projectId, next, dispatch, state, result

  beforeEach(() => {
    projectId = 'project 1'
    next = sinon.stub()
    dispatch = sinon.stub()
    state = {
      builds: {
        refresh: {
          enabled: true
        },
        value: [
          {buildNum: 40},
          {buildNum: 42},
          {buildNum: 41, status: 'pending'}
        ]
      },
      projects: {
        selected: {id: projectId}
      }
    }
    result = 'placeholder' // no logic around this
    sinon.stub(agent, 'get').resolves({body: result})
  })

  const apply = () => {
    const thunk = refreshBuilds(projectId, next)
    return thunk(dispatch, () => state)
  }

  afterEach(() => {
    agent.get.restore()
  })


  const shouldGetWith = query => {
    const baseUrl = `${apiBaseUrl}/projects/${encodeURIComponent(projectId)}/build-updates`
    agent.get.should.have.been.calledWithExactly(`${baseUrl}?${query}`)
  }

  describe('on success', () => {
    beforeEach(apply)

    it('invokes get with projects build-updates url and query string for pending build', () =>
      shouldGetWith('buildNums=41&lastBuildNum=42')
    )

    it('dispatches REFRESH_BUILDS with result', () => {
      dispatch.should.have.been.calledWithExactly({type: REFRESH_BUILDS, result})
    })

    it('invokes next', () => {
      next.should.have.been.calledWithExactly()
    })
  })

  describe('with no pending builds', () => {
    beforeEach(() => {
      state.builds.value = [{buildNum: 42}]
      return apply()
    })

    it('does not include buildNums query parameter', () =>
      shouldGetWith('lastBuildNum=42')
    )
  })

  describe('with no builds', () => {
    beforeEach(() => {
      state.builds.value = []
      return apply()
    })

    it('defaults lastBuildNum to 0', () =>
      shouldGetWith('lastBuildNum=0')
    )
  })

  const disableRefresh = () => {
    state = {
      ...state,
      builds: {
        ...state.builds,
        refresh: {enabled: false}
      }
    }
  }

  describe('on context change', () => {
    let promise

    beforeEach(() => {
      promise = apply()
    })

    const shouldNotRefresh = () => promise.then(() => {
      dispatch.should.not.have.been.called
      next.should.not.have.been.called
    })

    it('does not dispatch result when refresh is disabled', () => {
      disableRefresh()
      return shouldNotRefresh()
    })

    it('does not dispatch result when selected project changes', () => {
      state = {
        ...state,
        projects: {
          selected: {
            id: 'something else'
          }
        }
      }
      return shouldNotRefresh()
    })

    it('does not dispatch result when no builds are present', () => {
      state = {
        ...state,
        builds: {
          ...state.builds,
          value: undefined
        }
      }
      return shouldNotRefresh()
    })
  })

  describe('on error', () => {
    let promise

    beforeEach(() => {
      agent.get.rejects()
      promise = apply()
    })

    it('ignores and invokes next when context has not changed', () =>
      promise.then(() => next.should.have.been.calledWithExactly())
    )

    it('does nothing when context has changed', () => {
      disableRefresh()
      return promise.then(() => next.should.not.have.been.called)
    })
  })
})
