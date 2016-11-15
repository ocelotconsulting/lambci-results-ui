import React from 'react'
import {shallow} from 'enzyme'
import RepositoryLink from '../../src/components/RepositoryLink'

describe('RepositoryLink', () => {
  let repository, path, commit

  const render = () => shallow(<RepositoryLink repository={repository} path={path} commit={commit}/>)

  beforeEach(() => {
    repository = {
      baseUrl: 'https://github.com',
      project: 'foo/bar',
      icon: 'github'
    }

    path = undefined
    commit = undefined
  })

  describe('link url', () => {
    const url = () => render().find('a').prop('href')

    it('is project url when path and commit are missing', () => {
      url().should.equal(`${repository.baseUrl}/${repository.project}`)
    })

    it('includes commit when commit is provided', () => {
      commit = '123'

      url().should.equal(`${repository.baseUrl}/${repository.project}/commit/${commit}`)
    })

    it('includes path when path is provided', () => {
      path = 'user23'

      url().should.equal(`${repository.baseUrl}/${path}`)
    })
  })

  describe('icon', () => {
    it('is included', () => {
      render().find(`.fa.fa-${repository.icon}`).length.should.equal(1)
    })
  })

  describe('display value', () => {
    const displayValue = () => render().find('a').children().at(2).text()

    it('is path when provided', () => {
      path = 'user23'

      displayValue().should.equal(path)
    })

    it('is truncated when provided', () => {
      commit = 'commit123sdlkfjdslfjdslfkjdskljf'

      displayValue().should.equal(commit.slice(0, 10))
    })

    it('is project when no path or commit is provided', () => {
      displayValue().should.equal(repository.project)
    })
  })

  describe('when repository baseUrl is missing', () => {
    beforeEach(() => {
      delete repository.baseUrl
    })

    it('simply renders value', () => {
      render().text().should.equal(repository.project)
    })

  })

})
