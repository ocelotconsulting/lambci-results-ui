import React from 'react'
import BuildColumn from '../../src/components/BuildColumn'
import { shallow } from 'enzyme'

describe('BuildColumn', () => {
  let projectId, buildNum, component

  beforeEach(() => {
    projectId = 'project 2'
    buildNum = 3
    component = shallow(<BuildColumn projectId={projectId} buildNum={buildNum}/>)
  })

  it('renders link', () =>
    component.find('td.build-number-link Link').prop('to').should.equal(
      `/projects/${encodeURIComponent(projectId)}/builds/${buildNum}`
    )
  )
})
