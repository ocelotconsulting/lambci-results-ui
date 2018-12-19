import builds from '../../src/store/builds'
import {
  GET_BUILDS,
  REFRESH_BUILDS,
  SET_BUILD_PAGE,
  SET_BUILD_REFRESH_ENABLED,
  SET_BUILD_REFRESH_TIMEOUT_ID,
  WAKE_BUILD_REFRESH
} from '../../src/actions/types'

describe('builds reducer', () => {
  let state, action

  const dispatch = () => builds(state, action)

  const update = values => {
    state = { ...state, ...values }
  }

  const updateSubProperty = (propertyName, values) => update({
    [propertyName]: {
      ...state[propertyName],
      ...values
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
        update({ error: '!' })
        should.not.exist(dispatch().error)
      })

      it('clears existing builds', () => {
        update({ value: [1, 2] })
        should.not.exist(dispatch().value)
      })

      it('resets sleep count', () => {
        updateSubProperty('refresh', { sleepCount: 42 })

        dispatch().refresh.sleepCount.should.equal(0)
      })

      it('sets paging properties nextEnabled and previousEnabled to false', () => {
        updateSubProperty('paging', { nextEnabled: true, previousEnabled: false })

        dispatch().paging.should.eql({
          pageSize: 20,
          page: 1,
          nextEnabled: false,
          previousEnabled: false
        })
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
        action.result = [{ buildNum: 4 }, { buildNum: 3 }, { buildNum: 2 }]
        updateSubProperty('paging', { pageSize: 3 })
      })

      it('sets error', () => {
        dispatch().value.should.equal(action.result)
      })

      it('enables nextPage when oldest build num > 1 and count is page size', () => {
        dispatch().paging.nextEnabled.should.be.true
      })

      it('disables nextPage when oldest build num is 1', () => {
        action.result[2].buildNum = 1

        dispatch().paging.nextEnabled.should.be.false
      })

      it('disables previousPage when page # is 1', () => {
        dispatch().paging.previousEnabled.should.be.false
      })

      it('enables previousPage when page # is > 1', () => {
        updateSubProperty('paging', { page: 2 })

        dispatch().paging.previousEnabled.should.be.true
      })
    })
  })

  describe('SET_BUILD_REFRESH_ENABLED', () => {
    beforeEach(() => {
      action.type = SET_BUILD_REFRESH_ENABLED
      action.value = !state.refresh.enabled
    })

    it('clears timeout id', () => {
      updateSubProperty('refresh', { timeoutId: 42 })
      should.not.exist(dispatch().refresh.timeoutId)
    })

    it('sets value', () => {
      dispatch().refresh.enabled.should.equal(true)
    })
  })

  describe('REFRESH_BUILDS', () => {
    beforeEach(() => {
      update({ value: [{ buildNum: 1, user: 'bob' }] })
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
          { buildNum: 2, status: 'success' }
        ]
      })

      it('resets sleepCount to 0', () => {
        updateSubProperty('refresh', { sleepCount: 99 })
        dispatch().refresh.sleepCount.should.equal(0)
      })

      it('adds new build', () => {
        dispatch().value.should.eql([
          { buildNum: 2, status: 'success' },
          { buildNum: 1, user: 'bob' }
        ])
      })

      it('updates existing build', () => {
        action.result[0].buildNum = 1
        dispatch().value.should.eql([{ buildNum: 1, user: 'bob', status: 'success' }])
      })

      it('retains page size by discarding old builds if needed', () => {
        updateSubProperty('paging', { pageSize: 1 })
        dispatch().value.should.eql([
          { buildNum: 2, status: 'success' }
        ])
      })

      it('sets nextEnabled and previousEnabled', () => {
        updateSubProperty('paging', { page: 2, pageSize: 1, nextEnabled: false, previousEnabled: false })
        dispatch().paging.should.eql({
          page: 2,
          pageSize: 1,
          nextEnabled: true,
          previousEnabled: true
        })
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
      updateSubProperty('refresh', { sleepCount: 10 })
    })

    it('resets sleep count', () => {
      dispatch().refresh.sleepCount.should.equal(0)
    })
  })

  describe('SET_BUILD_PAGE', () => {
    beforeEach(() => {
      action.type = SET_BUILD_PAGE
    })
  })
})
