const {handler} = require('../../../api/lambda')
const routes = require('../../../api/routes')

describe('lambda', () => {
  let event, context, callback, stub

  const invoke = () => handler(event, context, callback)

  beforeEach(() => {
    stub = undefined
    event = {
      httpMethod: 'GET',
      path: '/projects',
      headers: {
      },
      queryStringParameters: {
      }
    }
    // {httpMethod, path, body, headers, queryStringParameters}
    context = {}

    callback = sinon.stub()
  })

  afterEach(() => {
    stub && stub.restore()
  })


  const stubRoute = (path, method) => {
    const route = routes.find(r => r.path.id === path)
    should.exist(route)
    return sinon.stub(route, method)
  }

  describe('GET /projects', () => {
    beforeEach(() => {
      stub = stubRoute('/projects', 'get')
    })

    it('invokes handler', () => {
      invoke()
      stub.should.have.been.calledOnce
      stub.lastCall.args.length.should.equal(3)
    })

    it('sends 500 on unknown error', () => {
      invoke()
      const next = stub.lastCall.args[2]
      const errorMessage = 'ouch'
      next(new Error(errorMessage))

      callback.should.have.been.calledWithExactly(null, {
        statusCode: 500,
        body: 'An unexpected error occurred: ouch',
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    })
  })

  const putConfigPath = '/projects/:projectId/config'

  describe(`PUT ${putConfigPath}`, () => {
    let body

    beforeEach(() => {
      event.path = '/projects/foo-bar/config'
      event.httpMethod = 'PUT'
      body = {foo: 42}
      event.body = JSON.stringify(body)
      stub = stubRoute(putConfigPath, 'put')
    })

    it('invokes handler', () => {
      invoke()

      stub.should.have.been.called
    })

    it('parses body and set params in req object', () => {
      event.headers.header1 = '!'

      event.queryStringParameters.foo = 'bar'
      invoke()

      stub.lastCall.args[0].should.eql({
        params: {
          projectId: 'foo-bar'
        },
        body,
        headers: event.headers,
        query: event.queryStringParameters
      })
    })
  })

  describe('on route not found', () => {
    it('sends 404', () => {
      event.path = '/foobar'
      invoke()

      callback.should.have.been.calledWithExactly(null, {
        statusCode: 404,
        body: 'Route not found: GET /foobar',
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    })
  })

})