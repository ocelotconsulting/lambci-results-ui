import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'

const Projects = ({projects, params: {bucketId}}) => projects ? (
  <div className='container'>
    <h3>Projects</h3>
    <ul className='projects'>
      {projects.map(({id}) => (
        <li key={id} className='project'>
          <Link to={`/instances/${encodeURIComponent(bucketId)}/${encodeURIComponent(id)}`}>
            {id}
          </Link>
        </li>
      ))}
    </ul>
  </div>
) : <Spinner/>

Projects.displayName = 'Projects'

Projects.propTypes = {
  projects: T.arrayOf(T.object)
}

const mapStateToProps = ({buckets: {projects}}) => ({projects})

export default connect(mapStateToProps, () => ({}))(Projects)

