import React from 'react'
import moment from 'moment'
import SleepOverlay from '../../src/components/SleepOverlay'
import {shallow} from 'enzyme'

describe('BuildColumn', () => {
  let {tickDuration, lastTimestamp, onWakeUp, wrapper} = {}

  beforeEach(() => {
    tickDuration = 1
    lastTimestamp = moment().subtract(25, 'days')
    onWakeUp = sinon.stub()
  })

  afterEach(() => {
    wrapper && wrapper.instance().componentWillUnmount()
  })

  const render = () => {
    wrapper = shallow(
      <SleepOverlay lastTimestamp={lastTimestamp} onWakeUp={onWakeUp} tickDuration={tickDuration}/>
    )
    wrapper.instance().componentDidMount()
    return wrapper
  }


  it('updates state every interval', (done) => {
    render()

    setTimeout(() => {
      wrapper.state('ticks').should.be.greaterThan(2)
      done()
    }, 20)
  })

  describe('link', () => {
    let preventDefault

    beforeEach(() => {
      preventDefault = sinon.stub()
    })

    const click = () => render().find('.actions a').simulate('click', {preventDefault})

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
