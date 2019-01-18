import http from '../../src/actions/http'
import { SAVE_CONFIG } from '../../src/actions/types'
import deleteBranch from '../../src/actions/deleteBranch'
import history from '../../src/history'

describe('deleteBranch', () => {
  let projectId, branch, dispatch, state, path

  beforeEach(() => {
    sinon.stub(http, 'put').resolves()
    sinon.stub(history, 'push')
    dispatch = sinon.stub()
    projectId = 'project 1'
    path = `projects/${encodeURIComponent(projectId)}/config`
    branch = 'branch1'
    state = {
      config: {
        value: {
          branches: {
            [branch]: 'a branch'
          }
        }
      }
    }
  })

  afterEach(() => {
    http.put.restore()
    history.push.restore()
  })

  const apply = () => {
    const thunk = deleteBranch(projectId, branch)
    return thunk(dispatch, () => state)
  }

  it('puts config with branch removed', async () => {
    await apply()

    http.put.should.have.been.calledWithExactly(dispatch, SAVE_CONFIG, path, { branches: {} })
  })

  it('does not modify original state', async () => {
    await apply()

    should.exist(state.config.value.branches[branch])
  })

  it('navigates to main config page', async () => {
    await apply()

    history.push.should.have.been.calledWithExactly(`/${path}`)
  })
})
