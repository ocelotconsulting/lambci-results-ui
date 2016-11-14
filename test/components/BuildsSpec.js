import React from 'react'
import {Builds} from '../../src/components/Builds'
import {shallow} from 'enzyme'

describe('Builds', () => {
  let repository, builds, projectId, sleeping, onWakeUp

  const render = () => shallow(
    <Builds builds={builds} repository={repository} params={{projectId}} sleeping={sleeping} onWakeUp={onWakeUp}/>
  )

  beforeEach(() => {
    repository = {}
    projectId = 'foo bar'
    builds = [{id: 1}]
    sleeping = false
    onWakeUp = sinon.stub()
  })

  describe('when builds is missing', () => {
    beforeEach(() => {
      builds = undefined
    })

    it('displays spinner', () => {
      const wrapper = render()
      wrapper.find('.builds').length.should.equal(0)
      wrapper.find('Spinner').length.should.equal(1)
    })
  })

  describe('when no builds are found', () => {
    beforeEach(() => {
      builds = []
    })

    it('displays no builds found message', () => {
      const wrapper = render()
      wrapper.find('table').length.should.equal(0)
      wrapper.find('.no-builds').length.should.equal(1)
    })
  })

  describe('when builds are non-empty', () => {
    it('renders table', () => {
      const wrapper = render()
      wrapper.find('BuildTable').length.should.equal(1)
    })
  })

  describe('when sleeping', () => {
    let overlay

    beforeEach(() => {
      sleeping = true
      overlay = render().find('SleepOverlay')
    })

    it('renders overlay', () => {
      overlay.length.should.equal(1)
    })

    it('passes onWakeUp prop to overlay', () => {
      overlay.prop('onWakeUp').should.equal(onWakeUp)
    })

  })
})