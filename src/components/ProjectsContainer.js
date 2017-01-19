import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import ProjectTable from './ProjectTable'
import {connect} from 'react-redux'

export const Projects = ({projects}) => projects ? (
  <div className='container projects'>
    <h3>
      {'Projects '}
      <small>Lambda Continuous Integration</small>
    </h3>
    <ProjectTable projects={projects}/>
    <div className='ocelot-notice'>
      {'designed and developed by '}
      <a href='http://www.ocelotconsulting.com'>
        Ocelot Consulting LLC
      </a>
    </div>
  </div>
) : (
  <Spinner/>
)

Projects.displayName = 'Projects'

Projects.propTypes = {
  projects: T.arrayOf(T.object)
}

export const mapStateToProps = ({projects: {all}}) => ({projects: all})

export default connect(mapStateToProps, () => ({}))(Projects)

