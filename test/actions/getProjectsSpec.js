import getProjects from '../../src/actions/getProjects'
import {GET_PROJECTS} from '../../src/actions/types'
import http from '../../src/actions/http'

describe('getProjects', () => {
  let dispatch

  beforeEach(() => {
    sinon.stub(http, 'get')
    dispatch = sinon.stub()
    getProjects()(dispatch)
  })

  afterEach(() => {
    http.get.restore()
  })

  it('invokes http get with projects path', () =>
    http.get.should.have.been.calledWith(dispatch, GET_PROJECTS, 'projects')
  )

  it('provides transformer to include repository', () => {
    const projects = [
      {id: 'gh/foo/bar'},
      {id: 'not-gh/bar/baz'}
    ]
    const {args} = http.get.lastCall
    args.length.should.equal(4)
    const transform = args[3]
    transform(projects).should.eql([
      {id: projects[0].id, repository: {baseUrl: 'https://github.com', icon: 'github', project: 'foo/bar'}},
      {id: projects[1].id, repository: {}}
    ])
  })
})
