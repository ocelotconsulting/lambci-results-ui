import React from 'react'
import {shallow} from 'enzyme'
import Breadcrumb from '../../src/components/Breadcrumb'

describe('Breadcrumb', () => {
  let path

  beforeEach(() => {
    path = [
      {segment: 'foo', content: 'Foo'},
      {segment: 'bar bar', content: 'Bar'},
      {segment: 'baz', content: 'Baz', active: true}
    ]
  })

  const render = () => shallow(<Breadcrumb path={path}/>)

  it('renders link for each inactive segment', () => {
    render().find('Link').length.should.equal(2)
  })

  it('encodes path', () => {
    const link = render().find('li').at(1).find('Link')

    link.prop('to').should.equal(`/${path[0].segment}/${encodeURIComponent(path[1].segment)}`)
  })

  it('renders active item as just content', () => {
    render().find('li').at(2).text().should.eql(path[2].content)
  })
})
