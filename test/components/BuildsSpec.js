import React from 'react'
import {Builds} from '../../src/components/Builds'
import {shallow} from 'enzyme'

describe('Builds', () => {
  let onRefresh, repository, refreshTime, builds, projectId

  const render = () => shallow(
    <Builds builds={builds} onRefresh={onRefresh} repository={repository}
            refreshTime={refreshTime} params={{projectId}}/>
  )

  beforeEach(() => {
    onRefresh = sinon.stub()
    repository = {}
    refreshTime = 0
    projectId = 'foo bar'
    builds = [{id: 1}]
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

  describe('with refresh enabled', () => {
    let wrapper

    beforeEach(() => {
      onRefresh.resolves()
      refreshTime = 1
      wrapper = render()
    })

    const unmount = () => wrapper && wrapper.instance().componentWillUnmount()

    afterEach((done) => {
      unmount()
      setTimeout(done, 1)
    })

    it('refreshes', (done) => {
      setTimeout(() => {
        onRefresh.should.have.been.calledWithExactly()
        done()
      }, 1)
    })

    it('refreshes again after original refresh completes', (done) => {
      setTimeout(() => {
        onRefresh.callCount.should.be.greaterThan(1)
        done()
      }, 50)
    })

    it('does not refresh if component is unmounted', (done) => {
      unmount()
      setTimeout(() => {
        //noinspection BadExpressionStatementJS
        onRefresh.should.not.have.been.called
        done()
      }, 0)
    })

  })
})