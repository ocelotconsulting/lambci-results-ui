import agent from '../../src/agent'
import getAction from '../../src/actions/getAction'

describe('getAction', () => {
  let dispatch, actionId, url, transform

  beforeEach(() => {
    dispatch = sinon.stub()
    actionId = 'actionId'
    url = 'foo/bar'
    transform = undefined
    sinon.stub(agent, 'get').resolves({body: {ok: true}})
  })

  afterEach(() => {
    agent.get.restore()
  })

  const apply = () => getAction(dispatch, actionId, url, transform)

  const shouldHaveDispatched = (event) =>
    dispatch.should.have.been.calledWithExactly({type: actionId, ...event})

  it('dispatches start action', () => {
    const promise = apply()
    shouldHaveDispatched({status: 'start'})
    return promise
  })

  it('dispatches done action on completion', () => {
    apply()
    .then(() => shouldHaveDispatched({status: 'done', result: {ok: true}}))
  })

  it('dispatches error on error', () => {
    const error = new Error('!')
    agent.get.rejects(error)
    apply()
    .then(() => shouldHaveDispatched({status: 'error', error}))
  })

  it('transforms body if specified', () => {
    transform = sinon.stub().returns({ok: false})
    apply()
    .then(() => {
      shouldHaveDispatched({status: 'done', result: {ok: false}})
      transform.should.have.been.calledWithExactly({ok: true})
    })
  })




})


