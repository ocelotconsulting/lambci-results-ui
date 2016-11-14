const createRequest = require('../../../api/lambda/createRequest')

describe('createRequest', () => {
  let params, event

  beforeEach(() => {
    params = {x: 1}
    event = {
      headers: {header: '!'},
      queryStringParameters: {q: 1}
    }
  })

  const create = () => createRequest(params, event)

  it('includes params, headers, and query', () => {
    create().should.eql({
      params,
      headers: event.headers,
      query: event.queryStringParameters
    })
  })

  it('defaults query to empty object', () => {
    delete event.queryStringParameters

    create().query.should.eql({})
  })

  it('defaults headers to empty object', () => {
    delete event.headers

    create().headers.should.eql({})
  })

  it('parses body as JSON if present', () => {
    const body = {foo: 12}
    event.body = JSON.stringify(body)
    create().body.should.eql(body)
  })

})
