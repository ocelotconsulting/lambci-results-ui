import {GET_PROJECTS} from './types'
import http from './http'
import getRepository from '../store/getRepository'

const withRepositories = projects => projects.map(p => {
  p.repository = getRepository(p.id)
  return p
})

export default () =>
  dispatch =>
    http.get(dispatch, GET_PROJECTS, 'projects', withRepositories)
