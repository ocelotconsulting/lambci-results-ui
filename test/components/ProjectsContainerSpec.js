import React from 'react'
import { shallow } from 'enzyme'
import { Projects, mapStateToProps } from '../../src/components/ProjectsContainer'

describe('Projects', () => {
  describe('component', () => {
    let projects

    const render = () => shallow(<Projects projects={projects}/>)

    beforeEach(() => {
      projects = [{ id: 'foo/bar' }]
    })

    it('renders table when projects is defined', () => {
      const wrapper = render()
      wrapper.name().should.equal('div')
      wrapper.find('ProjectTable').length.should.equal(1)
    })

    it('renders table with projects', () => {
      render().find('ProjectTable').props().should.eql({ projects })
    })

    it('renders spinner when projects is not defined', () => {
      projects = undefined

      render().name().should.equal('Spinner')
    })
  })

  describe('mapStateToProps', () => {
    it('maps projects.all --> projects', () => {
      const all = [1, 2]
      mapStateToProps({ projects: { all } }).should.eql({ projects: all })
    })
  })
})
