import agent from 'superagent'
import http from '../../src/actions/http'
import { apiBaseUrl } from '../../src/config'

describe('http', () => {
  let dispatch, actionId, path, transform, result

  beforeEach(() => {
    dispatch = sinon.stub()
    actionId = 'actionId'
    path = 'foo/bar'
    transform = undefined
    result = { ok: true }
  })

  const shouldHaveDispatched = (event) =>
    dispatch.should.have.been.calledWithExactly({ type: actionId, ...event })

  describe('get', () => {
    beforeEach(() => {
      sinon.stub(agent, 'get').resolves({ body: result })
    })

    afterEach(() => {
      agent.get.restore()
    })

    const apply = () => http.get(dispatch, actionId, path, transform)

    it('dispatches start action', () => {
      const promise = apply()
      shouldHaveDispatched({ status: 'start' })
      return promise
    })

    it('dispatches done action on completion', async () => {
      await apply()

      shouldHaveDispatched({ status: 'done', result })
    })

    it('invokes get with full URL', async () => {
      await apply()

      agent.get.should.have.been.calledWithExactly(`${apiBaseUrl}/${path}`, undefined)
    })

    it('dispatches error on error', async () => {
      const error = new Error('!')
      agent.get.rejects(error)
      await apply()

      shouldHaveDispatched({ status: 'error', error })
    })

    it('transforms body if specified', async () => {
      transform = sinon.stub().returns({ ok: false })
      await apply()

      shouldHaveDispatched({ status: 'done', result: { ok: false } })
      transform.should.have.been.calledWithExactly({ ok: true })
    })
  })

  describe('put', () => {
    let requestBody

    beforeEach(() => {
      sinon.stub(agent, 'put').resolves({ body: result })
      requestBody = { id: 42 }
    })

    const apply = () => http.put(dispatch, actionId, path, requestBody)

    afterEach(() => {
      agent.put.restore()
    })

    it('invokes agent.put with url', async () => {
      await apply()

      shouldHaveDispatched({ status: 'done', result })
      agent.put.should.have.been.calledWithExactly(`${apiBaseUrl}/${path}`, requestBody)
    })
  })
})
