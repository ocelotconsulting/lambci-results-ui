import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'
import SleepOverlay from './SleepOverlay'
import wakeBuildRefresh from '../actions/wakeBuildRefresh'

export const Builds = ({repository, builds, sleeping, lastTimestamp, onWakeUp, params: {projectId}}) => builds ? (
  <div className='container builds'>
    {
      sleeping ? (<SleepOverlay lastTimestamp={lastTimestamp} onWakeUp={onWakeUp}/>) : undefined
    }
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

Builds.propTypes = {
  repository: T.object.isRequired,
  sleeping: T.bool.isRequired,
  lastTimestamp: T.number.isRequired,
  onWakeUp: T.func.isRequired,
  builds: T.arrayOf(T.object)
}

export const mapStateToProps = ({projects: {selected: {repository}}, builds: {value, refresh}}) => ({
  repository,
  builds: value,
  sleeping: refresh.sleepCount >= refresh.sleepThreshold,
  lastTimestamp: refresh.lastTimestamp
})

export const mapDispatchToProps = dispatch => ({
  onWakeUp: () => dispatch(wakeBuildRefresh())
})

export default connect(mapStateToProps, mapDispatchToProps)(Builds)
