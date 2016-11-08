import React, {PropTypes as T} from 'react'
import {Router, Route} from 'react-router'
import {connect} from 'react-redux'
import Buckets from './Buckets'
import Projects from './Projects'
import Builds from './Builds'
import selectBucket from '../store/buckets/actions/selectBucket'
import selectProject from '../store/project/actions/selectProject'
import history from '../history'

const App = ({onBucketSelected, onProjectSelected}) => (
  <Router history={history}>
    <Route path='/' component={Buckets}/>
    <Route path='/instances/:bucketId' component={Projects}
           onEnter={({params: {bucketId}}) => onBucketSelected(bucketId)}/>
    <Route path='/instances/:bucketId/:projectId' component={Builds}
           onEnter={({params: {bucketId, projectId}}) => onProjectSelected(bucketId, projectId)}/>
  </Router>
)

App.displayName = 'App'

App.propTypes = {
  onBucketSelected: T.func,
  onProjectSelected: T.func
}

const mapDispatchToProps = dispatch => {
  const onBucketSelected = bucketId => {
    dispatch(selectBucket(bucketId))
  }

  const onProjectSelected = (bucketId, projectId) => {
    onBucketSelected(bucketId)
    dispatch(selectProject(projectId))
  }

  return {onBucketSelected, onProjectSelected}
}

export default connect(() => ({}), mapDispatchToProps)(App)
