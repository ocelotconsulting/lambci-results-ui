import { SAVE_CONFIG } from '../../src/actions/types'
import proxyquire from '../proxyquire'

describe('saveConfig', () => {
  let projectId, branch, dispatch, state, getConfig, http, saveConfig, url, body

  beforeEach(() => {
    projectId = 'project 1'
    branch = undefined
    dispatch = sinon.stub()
    state = {
      config: {
        value: {
          branches: {}
        },
        editing: {
          id: 42,
          env: 'foo=bar'
        }
      }
    }
    getConfig = sinon.stub().returns('mockAction')
    http = {
      put: sinon.stub().resolves()
    }

    saveConfig = proxyquire('src/actions/saveConfig', {
      './getConfig': getConfig,
      './http': http
    }).default
    url = undefined
    body = undefined
  })

  const apply = async () => {
    const thunk = saveConfig(projectId, branch)
    await thunk(dispatch, () => state)
    http.put.callCount.should.equal(1)
    http.put.should.have.been.calledWith(dispatch, SAVE_CONFIG)
    url = http.put.lastCall.args[2]
    body = http.put.lastCall.args[3]
  }

  describe('without branch', () => {
    beforeEach(async () => {
      await apply()
    })

    it('invokes put with config URL', () => {
      url.should.equal(`projects/${encodeURIComponent(projectId)}/config`)
    })

    it('parses environment', () => {
      body.env.should.eql({ foo: 'bar' })
    })

    it('includes properties from edited config in body', () => {
      body.id.should.equal(state.config.editing.id)
    })
  })

  describe('when creating new branch', () => {
    beforeEach(() => {
      state.config.editing.newBranch = 'foo'
    })

    it('adds branches property if needed', async () => {
      await apply()
      body.branches.should.eql({ foo: {} })
    })

    it('adds branch config to existing branches', async () => {
      state.config.editing.branches = { bar: {} }
      await apply()

      body.branches.should.eql({ foo: {}, bar: {} })
    })
  })

  describe('when editing existing branch', () => {
    beforeEach(() => {
      branch = 'foo'
      return apply()
    })

    it('updates config for branch', () =>
      body.branches.foo.env.should.eql({ foo: 'bar' })
    )
  })

  describe('on success', () => {
    beforeEach(() => {
      branch = 'foobar'
      return apply()
    })

    it('dispatches getConfig action', () => {
      getConfig.should.have.been.calledWithExactly(projectId, branch)
      dispatch.should.have.been.calledWithExactly('mockAction')
    })
  })
})
