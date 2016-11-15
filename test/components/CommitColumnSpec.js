import React from 'react'
import CommitColumn from '../../src/components/CommitColumn'
import {shallow} from 'enzyme'

describe('CommitColumn', () => {
  let repository, commit

  const render = () => shallow(<CommitColumn repository={repository} commit={commit}/>)

  beforeEach(() => {
    repository = {type: 'github'}
    commit = '123'
  })

  it('renders td', () => {
    const td = render().find('td')
    td.length.should.equal(1)
    td.prop('className').should.equal('commit')
  })

  it('renders RepositoryLink', () => {
    render().find('RepositoryLink').props().should.eql({repository, commit})
  })

})
