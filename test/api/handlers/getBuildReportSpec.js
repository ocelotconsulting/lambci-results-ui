import mocks from '../../mocks'

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
    res = mocks.response()
    next = sinon.stub()

    querySingleBuild = sinon.stub()
    getBuildFile = sinon.stub()
    mocks.enable({
      './querySingleBuild': querySingleBuild,
      './getBuildFile': getBuildFile
    })
    getBuildReport = require('../../../api/handlers/getBuildReport')
  })

  afterEach(mocks.disable)

  const apply = () =>
    getBuildReport({params: {projectId, buildNum}}, res, next)

  const defaultApply = () => {
    querySingleBuild.resolves({build: {files}})
    getBuildFile.resolves({result: buildFile})
    return apply()
  }

  describe('with valid build and buildFile', () => {
    beforeEach(() => defaultApply())

    it('sends html file', () => {
      res.type.should.have.been.calledWithExactly(buildFile.contentType)
      res.send.should.have.been.calledWithExactly(buildFile.body)
    })

    it('gets build using projectId and buildNum', () =>
      querySingleBuild.should.have.been.calledWithExactly(projectId, buildNum)
    )

    it('gets build file using projectId, buildNum and fileName', () =>
      getBuildFile.should.have.been.calledWithExactly(projectId, buildNum, files[0])
    )

    it('does not invoke next', () =>
      next.should.not.have.been.called
    )
  })

  const shouldHaveSentResponse = (status, message) => {
    res.status.should.have.been.calledWithExactly(status)
    res.send.should.have.been.calledWithExactly(message)
  }

  describe('when no html file exists', () => {
    beforeEach(() => {
      files = ['foo.txt']
      return defaultApply()
    })

    it('sends 404', () =>
      shouldHaveSentResponse(404, `build report missing for project ${projectId} build #${buildNum}`)
    )
  })

  describe('when build is not found', () => {
    const message = 'not found'

    beforeEach(() => {
      querySingleBuild.resolves({status: 404, message})
      return apply()
    })

    it('sends 404', () =>
      shouldHaveSentResponse(404, message)
    )
  })

  describe('when getBuildFile returns status/message', () => {
    const status = 412
    const message = 'whoops'

    beforeEach(() => {
      querySingleBuild.resolves({build: {files}})
      getBuildFile.resolves({status, message})
      return apply()
    })

    it('sends result', () =>
      shouldHaveSentResponse(status, message)
    )
  })

  describe('when an unexpected error occurs', () => {
    const error = new Error

    beforeEach(() => {
      querySingleBuild.rejects(error)
      return apply()
    })

    it('invokes next', () =>
      next.should.have.been.calledWithExactly(error)
    )

  })
})