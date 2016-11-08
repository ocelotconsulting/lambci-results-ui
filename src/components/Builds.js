import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import Spinner from './Spinner'
import BuildTable from './BuildTable'

const Builds = ({builds, params: {bucketId, projectId}}) =>
  builds ? (
    <div className='container builds'>
      <h3>
        {`Builds for project ${projectId}`}
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

