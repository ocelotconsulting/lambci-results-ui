import React from 'react'
import moment from 'moment'
import {shallow} from 'enzyme'
import ProjectRow from '../../src/components/ProjectRow'
import {expectedProjectTableColumnCount} from './expectedColumnCounts'

describe('ProjectRow', () => {
  let project

  const render = () => shallow(<ProjectRow project={project}/>)

  beforeEach(() => {
    project = {
      id: 'foo/bar',
      lastTimestamp: moment().subtract(20, 'days').valueOf(),
      repository: {
        type: 'github'
      }
    }
  })

  it(`renders ${expectedProjectTableColumnCount} columns`, () => {
    render().find('tr').children().length.should.equal(expectedProjectTableColumnCount)
  })

  describe('id column', () => {
    let idColumn

    beforeEach(() => {
      idColumn = render().find('td.id')
    })

    it('renders link', () => {
      idColumn.find('Link').props().should.eql({
        onlyActiveOnIndex: false,
        style: {},
        children: project.id,
        to: `/projects/${encodeURIComponent(project.id)}/builds`
      })
    })
  })

  describe('last build time column', () => {
    const content = () => render().find('td.last-build-time').text()

    it("renders 'no builds' if no timestamp exists", () => {
      delete project.lastTimestamp
      content().should.equal('no builds')
    })

    it('renders fromNow expression if timestamp exists', () => {
      content().should.equal(moment(project.lastTimestamp).fromNow())
    })
  })

  describe('repository column', () => {
    it('renders link', () => {
      render().find('td.repository RepositoryLink').props().should.eql({repository: project.repository})
    })
  })

  describe('config column', () => {
    let configColumn

    beforeEach(() => {
      configColumn = render().find('td.config')
    })

    it('renders cog icon', () => {
      configColumn.find('.fa-cog').length.should.equal(1)
    })

    it('renders link to config page', () => {
      configColumn.find('Link').prop('to').should.equal(`/projects/${encodeURIComponent(project.id)}/config`)
    })


    it('renders configure text', () => {
      configColumn.find('Link').children().last().text().should.equal(' configure')
    })
  })
})
