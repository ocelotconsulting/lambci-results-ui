import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'

const Builds = ({repository, builds, params: {projectId}}) =>
  builds ? (
    <div className='container builds'>
      <ol className="breadcrumb">
        <li>
          <Link to='/projects'>Projects</Link>
        </li>
        <li className="active">
          {`${projectId}`}
        </li>
      </ol>
      <h3>
        <RepositoryLink repository={repository}/>
        {' '}
        <small>builds</small>
      </h3>
      {builds.length ? (
        <BuildTable projectId={projectId} builds={builds} repository={repository}/>
      ) : (
        <div className='no-builds'>no builds found</div>
      )}
    </div>
  ) : (
    <Spinner/>
  )

Builds.displayName = 'Builds'

Builds.propTypes = {
  repository: T.object.isRequired,
  builds: T.arrayOf(T.object)
}

const mapStateToProps = ({selectedProject: {repository}, builds}) => ({repository, builds})

export default connect(mapStateToProps, () => ({}))(Builds)

