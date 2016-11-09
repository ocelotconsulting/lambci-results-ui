import {GET_PROJECTS} from './types'
import getAction from '../../getAction'
import getRepository from '../../getRepository'
import encode from '../../../encode'

const withRepositories = projects => projects.map(p => {
  p.repository = getRepository(p.id)
  return p
})

export default bucketId =>
  dispatch => {
    getAction(dispatch, GET_PROJECTS, `/api/buckets/${encode(bucketId)}/projects`, withRepositories)
  }
