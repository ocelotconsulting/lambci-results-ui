import React from 'react'
import UserColumn from '../../src/components/UserColumn'
import {shallow} from 'enzyme'

describe('UserColumn', () => {
  let user, repository

  const render = () => shallow(
    <UserColumn user={user} repository={repository}/>
  )

  beforeEach(() => {
    user = 'user23'
    repository = {type: 'github'}
  })

  it('renders with user class', () => {
    render().prop('className').should.equal('user')
  })

  it('renders link', () => {
    render().find('RepositoryLink').props().should.eql({repository, path: user})
  })
})
