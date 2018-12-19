import React from 'react'
import T from 'prop-types'
import { Router, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import ProjectsContainer from './ProjectsContainer'
import BuildsContainer from './BuildsContainer'
import BuildContainer from './BuildContainer'
import ConfigContainer from './ConfigContainer'
import getProjects from '../actions/getProjects'
import getBuilds from '../actions/getBuilds'
import getConfig from '../actions/getConfig'
import selectBuild from '../actions/selectBuild'
import setBuildRefreshEnabled from '../actions/setBuildRefreshEnabled'
import history from '../history'

export const App = ({ onProjectSelected, onConfigSelected, onLoadProjects, onLeaveBuildsPage, onBuildSelected }) => (
  <Router history={history}>
    <Route path='/projects' component={ProjectsContainer} onEnter={onLoadProjects}/>
    <Route path='/projects/:projectId/config' component={ConfigContainer}
           onEnter={({ params: { projectId } }) => onConfigSelected(projectId)}/>
    <Route path='/projects/:projectId/config/:branch' component={ConfigContainer}
           onEnter={({ params: { projectId, branch } }) => onConfigSelected(projectId, branch)}/>
    <Route path='/projects/:projectId/builds' component={BuildsContainer}
           onEnter={({ params: { projectId } }) => onProjectSelected(projectId)}
           onLeave={onLeaveBuildsPage}/>
    <Route path='/projects/:projectId/builds/:buildNum' component={BuildContainer}
           onEnter={({ params: { projectId, buildNum } }) => onBuildSelected(projectId, buildNum)}/>
    <Redirect path="*" to="/projects" />
  </Router>
)

App.displayName = 'App'

App.propTypes = {
  onLoadProjects: T.func.isRequired,
  onConfigSelected: T.func.isRequired,
  onProjectSelected: T.func.isRequired,
  onLeaveBuildsPage: T.func.isRequired,
  onBuildSelected: T.func.isRequired
}

export const mapDispatchToProps = dispatch => ({
  onLoadProjects: () => dispatch(getProjects()),
  onConfigSelected: (projectId, branch) => dispatch(getConfig(projectId, branch)),
  onProjectSelected: projectId => {
    dispatch(setBuildRefreshEnabled(true))
    dispatch(getBuilds(projectId))
  },
  onLeaveBuildsPage: () => dispatch(setBuildRefreshEnabled(false)),
  onBuildSelected: (projectId, buildNum) => dispatch(selectBuild(projectId, buildNum))
})

export default connect(() => ({}), mapDispatchToProps)(App)
