import React from 'react'
import BuildTable from '../../src/components/BuildTable'
import {shallow} from 'enzyme'
import {expectedBuildTableColumnCount} from './expectedColumnCounts'

describe('BuildTable', () => {
  let {projectId, repository, builds} = {}

  const render = () => shallow(
    <BuildTable projectId={projectId} repository={repository} builds={builds}/>
  )

  beforeEach(() => {
    projectId = 'my/project'
    repository = {icon: 'github'}
    builds = [{buildNum: 1}, {buildNum: 2}]
  })

  it(`renders ${expectedBuildTableColumnCount} column headers`, () => {
    render().find('thead tr th').length.should.equal(expectedBuildTableColumnCount)
  })

  it('renders row for each build', () => {
    render().find('BuildRow').length.should.equal(builds.length)
  })

  it('provides each row with project id and repository', () => {
    render().find('BuildRow').first().props().should.eql({projectId, repository, build: builds[0]})
  })

})
