import React from 'react'
import moment from 'moment'
import SleepOverlay from '../../src/components/SleepOverlay'
import { shallow } from 'enzyme'

describe('SleepOverlay', () => {
  let { tickDuration, lastTimestamp, onWakeUp, wrapper } = {}

  beforeEach(() => {
    tickDuration = 1
    lastTimestamp = moment().subtract(25, 'days').valueOf()
    onWakeUp = sinon.stub()
  })

  afterEach(() => {
    wrapper && wrapper.instance().componentWillUnmount()
  })

  const render = () => {
    wrapper = shallow(
      <SleepOverlay lastTimestamp={lastTimestamp} onWakeUp={onWakeUp} tickDuration={tickDuration}/>
    )
    return wrapper
  }

  it('updates state every interval', (done) => {
    render()
    const maxTries = 20
    let tries = 0

    const fail = () => done(new Error('timed out'))

    let next

    const checkTicks = () => {
      const ticks = wrapper.state('ticks')
      if (ticks < 2) {
        tries++
        if (tries === maxTries) { fail() } else { next() }
      } else done()
    }

    next = () => setTimeout(checkTicks, 10)

    next()
  })

  describe('link', () => {
    let preventDefault

    beforeEach(() => {
      preventDefault = sinon.stub()
    })

    const click = () => render().find('.actions a').simulate('click', { preventDefault })

    it('invokes onWakeUp on click', () => {
      click()

      onWakeUp.should.have.been.calledWithExactly()
    })

    it('prevents default on click', () => {
      click()

      preventDefault.should.have.been.calledWithExactly()
    })
  })
})
