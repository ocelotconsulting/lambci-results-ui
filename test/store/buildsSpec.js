import builds from '../../src/store/builds'
import {
  GET_BUILDS,
  SET_BUILD_REFRESH_ENABLED,
  REFRESH_BUILDS,
  SET_BUILD_REFRESH_TIMEOUT_ID,
  WAKE_BUILD_REFRESH
} from '../../src/actions/types'

describe('builds', () => {
  let state, action

  const dispatch = () => builds(state, action)

  const update = values => state = {...state, ...values}

  const updateRefresh = values => update({
    refresh: {
      ...state.refresh,
      values
    }
  })

  beforeEach(() => {
    state = builds()
    action = {}
  })

  describe('GET_BUILDS', () => {
    beforeEach(() => {
      action.type = GET_BUILDS
    })

    describe('start', () => {
      beforeEach(() => {
        action.status = 'start'
      })

      it('clears error', () => {
        update({error: '!'})
        should.not.exist(dispatch().error)
      })

      it('clears existing builds', () => {
        update({value: [1, 2]})
        should.not.exist(dispatch().value)
      })

      it('resets sleep count', () => {
        updateRefresh({sleepCount: 42})

        dispatch().refresh.sleepCount.should.equal(0)
      })
    })

    describe('error', () => {
      beforeEach(() => {
        action.status = 'error'
        action.error = new Error('oops')
      })

      it('sets error', () => {
        dispatch().error.should.equal(action.error)
      })
    })

    describe('done', () => {
      beforeEach(() => {
        action.status = 'done'
        action.result = [1, 2, 3]
      })

      it('sets error', () => {
        dispatch().value.should.equal(action.result)
      })

    })
  })

  describe('SET_BUILD_REFRESH_ENABLED', () => {
    beforeEach(() => {
      action.type = SET_BUILD_REFRESH_ENABLED
      action.value = !state.refresh.enabled
    })

    it('clears timeout id', () => {
      updateRefresh({timeoutId: 42})
      should.not.exist(dispatch().refresh.timeoutId)
    })

    it('sets value', () => {
      dispatch().refresh.enabled.should.equal(true)
    })
  })

  describe('REFRESH_BUILDS', () => {
    beforeEach(() => {
      update({value: [{buildNum: 1, user: 'bob'}]})
      action.type = REFRESH_BUILDS
      action.result = []
    })

    it('sets lastTimestamp', () => {
      dispatch().refresh.lastTimestamp.should.be.closeTo(Date.now(), 5000)
    })

    it('increments sleep count when results are empty', () => {
      dispatch().refresh.sleepCount.should.equal(1)
    })

    describe('with results', () => {
      beforeEach(() => {
        action.result = [
          {buildNum: 2, status: 'success'}
        ]
      })

      it('resets sleepCount to 0', () => {
        updateRefresh({sleepCount: 99})
        dispatch().refresh.sleepCount.should.equal(0)
      })

      it('adds new build', () => {
        dispatch().value.should.eql([
          {buildNum: 2, status: 'success'},
          {buildNum: 1, user: 'bob'}
        ])
      })

      it('updates existing build', () => {
        action.result[0].buildNum = 1
        dispatch().value.should.eql([{buildNum: 1, user: 'bob', status: 'success'}])
      })
    })
  })

  describe('SET_BUILD_REFRESH_TIMEOUT_ID', () => {
    beforeEach(() => {
      action.type = SET_BUILD_REFRESH_TIMEOUT_ID
      action.value = 42
    })

    it('updates timeout id', () => {
      dispatch().refresh.timeoutId.should.equal(action.value)
    })

  })

  describe('WAKE_BUILD_REFRESH', () => {
    beforeEach(() => {
      action.type = WAKE_BUILD_REFRESH
      updateRefresh({sleepCount: 10})
    })

    it('resets sleep count', () => {
      dispatch().refresh.sleepCount.should.equal(0)
    })

  })


})
