import React, {PropTypes as T} from 'react'
import {Router, Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import Projects from './Projects'
import Builds from './Builds'
import ProjectConfig from './ProjectConfig'
import getProjects from '../store/actions/getProjects'
import selectProject from '../store/actions/selectProject'
import getConfig from '../store/actions/getConfig'
import history from '../history'

const App = ({onProjectSelected, onConfigSelected, onLoadProjects}) => (
  <Router history={history}>
    <Route path='/projects' component={Projects} onEnter={onLoadProjects}/>
    <Route path='/projects/:projectId/config' component={ProjectConfig}
           onEnter={({params: {projectId}}) => onConfigSelected(projectId)}/>
    <Route path='/projects/:projectId/config/:branch' component={ProjectConfig}
           onEnter={({params: {projectId}}) => onConfigSelected(projectId)}/>
    <Route path='/projects/:projectId/builds' component={Builds}
           onEnter={({params: {projectId}}) => onProjectSelected(projectId)}/>
    <Redirect path="*" to="/projects" />
  </Router>
)

App.displayName = 'App'

App.propTypes = {
  onLoadProjects: T.func.isRequired,
  onConfigSelected: T.func.isRequired,
  onProjectSelected: T.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onLoadProjects: () => dispatch(getProjects()),
  onProjectSelected: projectId => dispatch(selectProject(projectId)),
  onConfigSelected: projectId => dispatch(getConfig(projectId))
})

export default connect(() => ({}), mapDispatchToProps)(App)
