import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import encode from '../encode'

const Builds = ({builds, params: {bucketId, projectId}}) =>
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
        Builds
      </h3>
      {builds.length ? (
        <BuildTable bucketId={bucketId} projectId={projectId} builds={builds}/>
      ) : (
        <div className='no-builds'>no builds found</div>
      )}
    </div>
  ) : (
    <Spinner/>
  )

Builds.displayName = 'Builds'

Builds.propTypes = {
  builds: T.arrayOf(T.object)
}

const mapStateToProps = ({project: {builds}}) => ({builds})

export default connect(mapStateToProps, () => ({}))(Builds)

