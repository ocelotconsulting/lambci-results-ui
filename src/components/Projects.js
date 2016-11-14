import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import ProjectTable from './ProjectTable'
import {connect} from 'react-redux'

const Projects = ({projects}) => projects ? (
  <div className='container'>
    <h3>Projects</h3>
    <ProjectTable projects={projects}/>
  </div>
) : (
  <Spinner/>
)

Projects.displayName = 'Projects'

Projects.propTypes = {
  projects: T.arrayOf(T.object)
}

const mapStateToProps = ({projects: {all}}) => ({projects: all})

export default connect(mapStateToProps, () => ({}))(Projects)

