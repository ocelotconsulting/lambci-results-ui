import React from 'react'
import BuildColumn from '../../src/components/BuildColumn'
import {shallow} from 'enzyme'

describe('BuildColumn', () => {
  let {bucketId, projectId, buildNum, files} = {}

  beforeEach(() => {
    bucketId = 'bucket 1'
    projectId = 'project 2'
    buildNum = 3
    files = ['foo.html']
  })

  const render = () =>
    shallow(<BuildColumn bucketId={bucketId} projectId={projectId} buildNum={buildNum} files={files}/>)


  it('renders simple label when no html file is found', () => {
    files = ['foo.txt']
    const wrapper = render()
    wrapper.find('td').text().should.equal(`#${buildNum}`)
    wrapper.find('a').length.should.equal(0)
  })

  it('renders link when html file is found', () => {
    const linkWrapper = render().find('a')

    const url = `/api/buckets/${encodeURIComponent(bucketId)}/projects/${encodeURIComponent(projectId)}/builds/3/foo.html`
    linkWrapper.prop('href').should.equal(url)
    linkWrapper.text().should.equal(`#${buildNum}`)
  })
})
