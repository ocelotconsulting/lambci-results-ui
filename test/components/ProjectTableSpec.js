import React from 'react'
import { shallow } from 'enzyme'
import ProjectTable from '../../src/components/ProjectTable'
import { expectedProjectTableColumnCount } from './expectedColumnCounts'

describe('ProjectTable', () => {
  let projects

  const render = () => shallow(<ProjectTable projects={projects}/>)

  beforeEach(() => {
    projects = [{ id: 'foo/bar' }, { id: 'bar/baz' }]
  })

  it(`renders ${expectedProjectTableColumnCount} column headers`, () => {
    render().find('thead tr th').length.should.equal(expectedProjectTableColumnCount)
  })

  it('renders for for each project', () => {
    const rows = render().find('ProjectRow')
    rows.length.should.equal(projects.length)
    rows.first().props().should.eql({ project: projects[0] })
  })
})
