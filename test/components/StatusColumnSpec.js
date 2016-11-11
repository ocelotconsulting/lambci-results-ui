import React from 'react'
import StatusColumn from '../../src/components/StatusColumn'
import {shallow} from 'enzyme'

describe('StatusColumn', () => {
  let status = undefined

  const render = () => shallow(
    <StatusColumn status={status}/>
  )

  beforeEach(() => {
    status = 'success'
  })

  const className = () => render().prop('className')

  it('renders with danger status when build is a failure', () => {
    status = 'failure'
    className().should.equal('status danger')
  })

  it('renders with success stats when build is a success', () => {
    className().should.equal('status success')
  })

  it('renders status when not pending', () => {
    render().text().should.equal(status)
  })

  it('renders icon when pending', () => {
    status = 'pending'
    render().text().should.equal('')
    render().find('i').length.should.equal(1)
  })
})
