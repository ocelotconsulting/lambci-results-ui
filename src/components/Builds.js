import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import encode from '../encode'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'

const Builds = ({repository, builds, params: {bucketId, projectId}}) =>
  builds ? (
    <div className='container builds'>
      <ol className="breadcrumb">
        <li>
          <Link to={`/instances/${encode(bucketId)}`}>Projects</Link>
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
        <BuildTable bucketId={bucketId} projectId={projectId} builds={builds} repository={repository}/>
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

const mapStateToProps = ({project: {repository, builds}}) => ({repository, builds})

export default connect(mapStateToProps, () => ({}))(Builds)

