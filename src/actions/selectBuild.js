import {SELECT_PROJECT, SELECT_BUILD} from './types'

export default (projectId, buildNum) =>
  dispatch => {
    dispatch({type: SELECT_PROJECT, projectId})
    dispatch({type: SELECT_BUILD, buildNum})
  }