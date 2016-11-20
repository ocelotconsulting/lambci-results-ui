import getConfig from '../../src/actions/getConfig'
import {SELECT_PROJECT, GET_CONFIG} from '../../src/actions/types'
import http from '../../src/actions/http'

describe('getConfig', () => {
  let projectId, branch, dispatch

  beforeEach(() => {
    sinon.stub(http, 'get')
    projectId = 'project 1'
    branch = {id: 2}
    dispatch = sinon.stub()
    const thunk = getConfig(projectId, branch)
    return thunk(dispatch)
  })

  afterEach(() => {
    http.get.restore()
  })

  it('selects project', () =>
    dispatch.should.have.been.calledWithExactly({type: SELECT_PROJECT, projectId})
  )

  it('gets config', () =>
    http.get.should.have.been.calledWith(dispatch, GET_CONFIG, `projects/${encodeURIComponent(projectId)}/config`)
  )

  it('provides transformer to include branch', () => {
    const {args} = http.get.lastCall
    args.length.should.equal(4)
    const transform = args[3]
    transform({id: 1}).should.eql({id: 1, branch})
  })
})
