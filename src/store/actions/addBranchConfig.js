import {ADD_BRANCH_CONFIG} from './types'

export default (prop, value, branch) =>
  (dispatch, getState) => dispatch({type: ADD_BRANCH_CONFIG, branch: getState().project.config._newBranchName})
