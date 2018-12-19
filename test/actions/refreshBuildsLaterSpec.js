import { SET_BUILD_REFRESH_TIMEOUT_ID } from '../../src/actions/types'
import proxyquire from '../proxyquire'

describe('refreshBuildsLater', () => {
  let dispatch, state, refreshBuilds, refreshBuildsLater, cleanup

  beforeEach(() => {
    dispatch = sinon.stub()
    refreshBuilds = sinon.stub().returns('mockAction')
    const mod = proxyquire('src/actions/refreshBuildsLater', {
      './refreshBuilds': refreshBuilds
    })
    cleanup = mod.cleanup
    refreshBuildsLater = mod.default
    state = {
      builds: {
        refresh: {
          waitTime: 1,
          sleepThreshold: 2,
          sleepCount: 1
        }
      },
      projects: {
        selected: { id: 'project1' }
      }
    }
  })

  afterEach(() => {
    cleanup()
  })

  const apply = () => refreshBuildsLater()(dispatch, () => state)

  describe('when sleeping', () => {
    it('does nothing', () => {
      state.builds.refresh.sleepThreshold = 1
      apply()
      dispatch.should.not.have.been.called
    })
  })

  describe('when not sleeping', () => {
    it('dispatches set timer id event', done => {
      apply()
      setTimeout(done, 20)
      dispatch.should.have.been.calledOnce
      dispatch.lastCall.args[0].type.should.equal(SET_BUILD_REFRESH_TIMEOUT_ID)
    })
  })

  describe('when timer event occurs', () => {
    beforeEach(done => {
      apply()
      setTimeout(done, 20)
    })

    it('dispatches refreshBuilds', () => {
      dispatch.should.have.been.calledTwice
      dispatch.should.have.been.calledWithExactly('mockAction')
    })

    it('creates refresh action with selected project', () => {
      refreshBuilds.should.have.been.calledWith(state.projects.selected.id)
    })

    it('redispatches upon callback', () => {
      refreshBuilds.lastCall.args[1]()

      dispatch.callCount.should.equal(3)
    })
  })
})
