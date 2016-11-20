import mockery from 'mockery'

// mockery requires too much freakin' boilerplate to use
export default {
  enable(mocks = {}) {
    mockery.enable({useCleanCache: true})
    mockery.warnOnUnregistered(false)
    for (let path in mocks) {
      mockery.registerMock(path, mocks[path])
    }
  },
  disable() {
    mockery.deregisterAll()
    mockery.disable()
  }
}
