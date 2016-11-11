import {GET_PROJECTS} from './types'
import getAction from '../getAction'
import getRepository from '../getRepository'

const withRepositories = projects => projects.map(p => {
  p.repository = getRepository(p.id)
  return p
})

export default () =>
  dispatch =>
    getAction(dispatch, GET_PROJECTS, `/api/projects`, withRepositories)
