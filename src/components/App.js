import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import BucketsContainer from './BucketsContainer'
import ProjectsContainer from './ProjectsContainer'

export default () =>
  <Router history={browserHistory}>
    <Route path='/' component={BucketsContainer}/>
    <Route path='/instances/:bucketId' component={ProjectsContainer}/>
  </Router>
