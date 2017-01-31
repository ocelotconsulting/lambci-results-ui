import mockery from 'mockery'
import decache from 'decache'

const responseMethods = [
  'type',
  'json',
  'status',
  'send',
  'cookie',
  'redirect'
]

// mockery requires too much freakin' boilerplate to use
export default {
  enable(mocks = {}) {
    mockery.enable({
      warnOnUnregistered: false
    })
    for (let path in mocks) {
      mockery.registerMock(path, mocks[path])
    }
  },
  disable() {
    mockery.deregisterAll()
    mockery.disable()
  },
  require(path) {
    const module = `../${path}`
    decache(module)
    return require(module)
  },
  response() {
    const res = {}
    responseMethods.forEach(method => res[method] = sinon.stub().returns(res))
    return res
  }
}
