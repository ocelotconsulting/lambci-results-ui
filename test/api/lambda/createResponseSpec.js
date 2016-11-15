const createResponse = require('../../../api/lambda/createResponse')

describe('createResponse', () => {
  let callback, res

  beforeEach(() => {
    callback = sinon.stub()
    res = createResponse(callback)
  })

  describe('type', () => {
    it('chains', () => {
      res.type('text/html').should.equal(res)
    })

    it('sets header', () => {
      res.type('text/html').send()

      callback.lastCall.args[1].headers.should.eql({
        'Content-Type': 'text/html'
      })
    })
  })

  describe('status', () => {
    it('chains', () => {
      res.set('foo', 42).should.equal(res)
    })

    it('sets statusCode', () => {
      res.status(404).send()

      callback.lastCall.args[1].statusCode.should.equal('404')
    })
  })

  describe('set', () => {
    it('chains', () => {
      res.status(404).should.equal(res)
    })

    it('sets header', () => {
      res.set('foo', 42).send()

      callback.lastCall.args[1].headers.should.eql({foo: 42})
    })
  })

  describe('json', () => {
    it('sets body, headers, and responds', () => {
      const body = {foo: 99}
      res.json(body)

      callback.should.have.been.calledWithExactly(null, {
        statusCode: '200',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })

  describe('send', () => {
    it('sets body, and responds', () => {
      const message = 'foo!'
      res.send(message)

      callback.should.have.been.calledWithExactly(null, {
        statusCode: '200',
        body: message,
        headers: {}
      })
    })
  })

})
