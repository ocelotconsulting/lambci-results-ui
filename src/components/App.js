import React, {PropTypes as T} from 'react'
import {Router, Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import Projects from './Projects'
import Builds from './Builds'
import ProjectConfig from './ProjectConfig'
import getProjects from '../actions/getProjects'
import getBuilds from '../actions/getBuilds'
import getConfig from '../actions/getConfig'
import setBuildRefreshEnabled from '../actions/setBuildRefreshEnabled'
import history from '../history'

const App = ({onProjectSelected, onConfigSelected, onLoadProjects, onLeaveBuildPage}) => (
  <Router history={history}>
    <Route path='/projects' component={Projects} onEnter={onLoadProjects}/>
    <Route path='/projects/:projectId/config' component={ProjectConfig}
           onEnter={({params: {projectId}}) => onConfigSelected(projectId)}/>
    <Route path='/projects/:projectId/config/:branch' component={ProjectConfig}
           onEnter={({params: {projectId, branch}}) => onConfigSelected(projectId, branch)}/>
    <Route path='/projects/:projectId/builds' component={Builds}
           onEnter={({params: {projectId}}) => onProjectSelected(projectId)}
           onLeave={onLeaveBuildPage}/>
    <Redirect path="*" to="/projects" />
  </Router>
)

App.displayName = 'App'

App.propTypes = {
  onLoadProjects: T.func.isRequired,
  onConfigSelected: T.func.isRequired,
  onProjectSelected: T.func.isRequired,
  onLeaveBuildPage: T.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onLoadProjects: () => dispatch(getProjects()),
  onConfigSelected: (projectId, branch) => dispatch(getConfig(projectId, branch)),
  onProjectSelected: projectId => {
    dispatch(setBuildRefreshEnabled(true))
    dispatch(getBuilds(projectId))
  },
  onLeaveBuildPage: () => dispatch(setBuildRefreshEnabled(false))
})

export default connect(() => ({}), mapDispatchToProps)(App)
