const sinon = require('sinon')

export default () => {
  const methods = [
    'type',
    'json',
    'status',
    'send',
    'cookie',
    'redirect',
    'set',
    'end'
  ]

  const mockResponse = {}

  methods.forEach(method => {
    mockResponse[method] = sinon.stub().returns(mockResponse)
  })

  return mockResponse
}
