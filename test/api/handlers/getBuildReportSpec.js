import proxyquire from '../../proxyquire'
import mockResponse from '../../mockResponse'

describe('getBuildReport', () => {
  let querySingleBuild, getBuildFile, getBuildReport
  let projectId, buildNum, files, buildFile, res, next

  beforeEach(() => {
    projectId = 'project12'
    buildNum = '42'
    files = [
      'foo.html'
    ]
    buildFile = {
      contentType: 'text/html',
      body: 'html'
    }
    res = mockResponse()
    next = sinon.stub()

    querySingleBuild = sinon.stub()
    getBuildFile = sinon.stub()
    getBuildReport = proxyquire('api/handlers/getBuildReport', {
      './querySingleBuild': querySingleBuild,
      './getBuildFile': getBuildFile
    })
  })

  const apply = () =>
    getBuildReport({ params: { projectId, buildNum } }, res, next)

  const defaultApply = () => {
    querySingleBuild.resolves({ build: { files } })
    getBuildFile.resolves({ result: buildFile })
    return apply()
  }

  describe('with valid build and buildFile', () => {
    it('sends html file', async () => {
      await defaultApply()

      res.type.should.have.been.calledWithExactly(buildFile.contentType)
      res.send.should.have.been.calledWithExactly(buildFile.body)
    })

    it('gets build using projectId and buildNum', async () => {
      await defaultApply()

      querySingleBuild.should.have.been.calledWithExactly(projectId, buildNum)
    })

    it('gets build file using projectId, buildNum and fileName', async () => {
      await defaultApply()

      getBuildFile.should.have.been.calledWithExactly(projectId, buildNum, files[0])
    })

    it('does not invoke next', async () => {
      await defaultApply()

      next.should.not.have.been.called
    })
  })

  const shouldHaveSentResponse = (status, message) => {
    res.status.should.have.been.calledWithExactly(status)
    res.json.should.have.been.calledWithExactly({ message })
  }

  describe('when no html file exists', () => {
    beforeEach(() => {
      files = ['foo.txt']
    })

    it('sends 404', async () => {
      await defaultApply()

      shouldHaveSentResponse(404, `build report missing for project ${projectId} build #${buildNum}`)
    })
  })

  describe('when build is not found', () => {
    const message = 'not found'

    beforeEach(() => {
      querySingleBuild.resolves({ status: 404, message })
    })

    it('sends 404', async () => {
      await apply()

      shouldHaveSentResponse(404, message)
    })
  })

  describe('when getBuildFile returns status/message', () => {
    const status = 412
    const message = 'whoops'

    beforeEach(() => {
      querySingleBuild.resolves({ build: { files } })
      getBuildFile.resolves({ status, message })
    })

    it('sends status/message response', async () => {
      await apply()

      shouldHaveSentResponse(status, message)
    })
  })
})
