import React from 'react'
import {Builds, mapStateToProps, mapDispatchToProps} from '../../src/components/Builds'
import {shallow} from 'enzyme'

describe('Builds', () => {
  describe('component', () => {
    let repository, builds, projectId, sleeping, lastTimestamp, onWakeUp

    const render = () => shallow(
      <Builds builds={builds} repository={repository} lastTimestamp={lastTimestamp}
              params={{projectId}} sleeping={sleeping} onWakeUp={onWakeUp}/>
    )

    beforeEach(() => {
      repository = {}
      projectId = 'foo bar'
      builds = [{id: 1}]
      sleeping = false
      lastTimestamp = Date.now()
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

      it('passes onWakeUp and lastTimestamp props to overlay', () => {
        overlay.props().should.eql({onWakeUp, lastTimestamp, tickDuration: 5000})
      })
    })
  })

  describe('mapStateToProps', () => {
    let state

    beforeEach(() => {
      state = {
        projects: {
          selected: {
            repository: {type: 'foo'}
          }
        },
        builds: {
          value: [1, 2],
          refresh: {
            sleepCount: 1,
            sleepThreshold: 2,
            lastTimestamp: 42
          }
        }
      }
    })

    const apply = () => mapStateToProps(state)

    it('maps repository, builds, and lastTimestamp', () => {
      apply().should.eql({
        repository: state.projects.selected.repository,
        builds: state.builds.value,
        lastTimestamp: state.builds.refresh.lastTimestamp,
        sleeping: false
      })
    })

    it('maps to sleeping: true if sleepCount at or over threshold', () => {
      state.builds.refresh.sleepCount = state.builds.refresh.sleepThreshold
      apply().sleeping.should.be.true
    })

  })

  describe('mapDispatchToProps', () => {
    let dispatch

    beforeEach(() => {
      dispatch = sinon.stub()
    })

    const apply = () => mapDispatchToProps(dispatch)

    it('maps onWakeUp', () => {
      (typeof apply().onWakeUp).should.equal('function')
    })
  })
})