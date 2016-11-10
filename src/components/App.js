import React, {PropTypes as T} from 'react'
import {Router, Route} from 'react-router'
import {connect} from 'react-redux'
import Buckets from './Buckets'
import Projects from './Projects'
import Builds from './Builds'
import ProjectConfig from './ProjectConfig'
import selectBucket from '../store/buckets/actions/selectBucket'
import selectProject from '../store/project/actions/selectProject'
import getConfig from '../store/project/actions/getConfig'
import getAllBuckets from '../store/buckets/actions/getAllBuckets'
import history from '../history'

const App = ({onBucketSelected, onProjectSelected, onConfigSelected, onLoadIndex}) => (
  <Router history={history}>
    <Route path='/' component={Buckets}
           onEnter={() => onLoadIndex()}/>
    <Route path='/instances/:bucketId' component={Projects}
           onEnter={({params: {bucketId}}) => onBucketSelected(bucketId)}/>
    <Route path='/instances/:bucketId/:projectId' component={Builds}
           onEnter={({params: {bucketId, projectId}}) => onProjectSelected(bucketId, projectId)}/>
     <Route path='/instances/:bucketId/:projectId/config' component={ProjectConfig}
           onEnter={({params: {projectId}}) => onConfigSelected(projectId)}/>
  </Router>
)

App.displayName = 'App'

App.propTypes = {
  onBucketSelected: T.func.isRequired,
  onProjectSelected: T.func.isRequired
}

const mapDispatchToProps = dispatch => {
  const onBucketSelected = bucketId => {
    dispatch(selectBucket(bucketId))
  }

  const onProjectSelected = (bucketId, projectId) => {
    onBucketSelected(bucketId)
    dispatch(selectProject(projectId))
  }

  const onConfigSelected = (projectId) => {
    dispatch(getConfig(projectId))
  }

  const onLoadIndex = () => {
    dispatch(getAllBuckets())
  }

  return {onBucketSelected, onProjectSelected, onConfigSelected, onLoadIndex}
}

export default connect(() => ({}), mapDispatchToProps)(App)
