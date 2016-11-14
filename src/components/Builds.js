import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'
import SleepOverlay from './SleepOverlay'
import wakeBuildRefresh from '../actions/wakeBuildRefresh'

const Builds = ({repository, builds, sleeping, onWakeUp, params: {projectId}}) => builds ? (
    <div className='container builds'>
      {
        sleeping ? (<SleepOverlay projectId={projectId} onWakeUp={onWakeUp}/>) : undefined
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
  onWakeUp: T.func.isRequired,
  builds: T.arrayOf(T.object)
}

const mapStateToProps = ({projects: {selected: {repository}}, builds: {value, refresh}}) => ({
  repository,
  builds: value,
  sleeping: refresh.sleepCount >= refresh.sleepThreshold
})

const mapDispatchToProps = dispatch => ({
  onWakeUp: () => dispatch(wakeBuildRefresh())
})

export {Builds}

export default connect(mapStateToProps, mapDispatchToProps)(Builds)
