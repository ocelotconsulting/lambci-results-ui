import { GET_PROJECTS, SELECT_PROJECT } from '../../src/actions/types'
import projects from '../../src/store/projects'

describe('projects reducer', () => {
  let state, action

  const dispatch = () => projects(state, action)

  const update = values => {
    state = { ...state, ...values }
  }

  beforeEach(() => {
    state = projects()
    action = {}
  })

  describe('GET_PROJECTS', () => {
    beforeEach(() => {
      action.type = GET_PROJECTS
    })

    describe('start', () => {
      beforeEach(() => {
        action.status = 'start'
      })

      it('clears all', () => {
        update({ all: [1, 2] })
        should.not.exist(dispatch().all)
      })

      it('clears error', () => {
        update({ error: '!' })
        should.not.exist(dispatch().error)
      })
    })

    describe('error', () => {
      beforeEach(() => {
        action.status = 'error'
        action.error = new Error('!')
      })

      it('sets error', () => {
        dispatch().error.should.equal(action.error)
      })
    })

    describe('done', () => {
      beforeEach(() => {
        action.status = 'done'
        action.result = [1, 2]
      })

      it('sets all', () => {
        dispatch().all.should.equal(action.result)
      })
    })
  })

  describe('SELECT_PROJECT', () => {
    beforeEach(() => {
      action.type = SELECT_PROJECT
      action.projectId = 'gh/foo/bar'
    })

    it('sets id', () => {
      dispatch().selected.id.should.equal(action.projectId)
    })

    it('sets repository to github when id starts with gh/', () => {
      dispatch().selected.repository.should.eql({
        baseUrl: 'https://github.com',
        icon: 'github',
        project: 'foo/bar'
      })
    })

    it('sets repository to empty when id does not start with gh/', () => {
      action.projectId = 'foo/bar'
      dispatch().selected.repository.should.eql({})
    })
  })
})
