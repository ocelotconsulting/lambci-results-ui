import React from 'react'
import BuildRow from '../../src/components/BuildRow'
import {shallow} from 'enzyme'
import moment from 'moment'

describe('BuildRow', () => {
  let {projectId, repository, build} = {}

  const render = () => shallow(
    <BuildRow projectId={projectId} repository={repository} build={build}/>
  )

  beforeEach(() => {
    projectId = 'my/project'
    repository = {icon: 'github'}
    let endedAt = moment().set({
      h: 23,
      m: 59,
      s: 59
    })

    build = {
      buildNum: 3,
      endedAt,
      startedAt: moment(endedAt).subtract(3, 's'),
      status: 'success',
      checkoutBranch: 'master',
      files: ['foo.html'],
      commit: '123',
      user: 'user1'
    }
  })

  describe('BuildColumn', () => {
    it('includes project id, buildNum, and files', () => {
      render().find('BuildColumn').props().should.eql({
        projectId,
        buildNum: build.buildNum,
        files: build.files
      })
    })
  })

  describe('status column', () => {
    it('renders with status', () => {
      render().find('StatusColumn').prop('status').should.equal(build.status)
    })
  })

  describe('branch column', () => {
    it('renders', () => {
      render().find('td.branch').text().should.equal(build.checkoutBranch)
    })
  })

  describe('time column', () => {
    const rendered = () => render().find('td.time').text()

    const expectedDate = () => new Date(build.endedAt).toLocaleDateString()

    const expectedTime = () => new Date(build.endedAt).toLocaleTimeString()

    it('renders seconds only when time is less than 1 minute', () => {
      rendered().should.equal(`${expectedTime()} (3 seconds)`)
    })

    const subtract = spec => moment(build.endedAt).subtract(spec).toISOString()

    it('renders minutes when time is less than an hour', () => {
      build.startedAt = subtract({m: 7, s: 1})

      rendered().should.equal(`${expectedTime()} (7 minutes, 1 second)`)
    })

    it('renders hours when time is greater than an hour', () => {
      build.startedAt = subtract({h: 1})

      rendered().should.equal(`${expectedTime()} (1 hour, 0 minutes, 0 seconds)`)
    })

    it('renders full date/time when build time is at least a day ago', () => {
      build.endedAt = moment(build.endedAt).subtract(1, 'd').toISOString()
      build.startedAt = subtract({s: '3'})

      rendered().should.equal(`${expectedDate()} ${expectedTime()} (3 seconds)`)
    })
  })

  describe('CommitColumn', () => {
    it('includes commit and repository', () => {
      render().find('CommitColumn').props().should.eql({
        repository,
        commit: build.commit
      })
    })
  })

  describe('UserColumn', () => {
    it('includes user and repository', () => {
      render().find('UserColumn').props().should.eql({
        repository,
        user: build.user
      })
    })
  })
})
