import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'
import refreshBuilds from '../store/actions/refreshBuilds'

class Builds extends React.Component {
  enableRefresh() {
    if (!this.refreshEnabled && this.props.refreshTime) {
      this.refreshEnabled = true

      const refresh = () => {
        if (this.refreshEnabled) {
          const promise = this.props.onRefresh()
          if (promise && typeof promise.then === 'function') {
            promise.then(refreshLater)
          }
        }
      }

      const refreshLater = () => setTimeout(refresh, this.props.refreshTime)

      refreshLater()
    }
  }
  componentWillUnmount() {
    this.refreshEnabled = false
  }

  render() {
    const {repository, builds, params: {projectId}} = this.props

    if (builds) this.enableRefresh()

    return builds ? (
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
  }
}

Builds.defaultProps = {
  refreshTime: 5000
}

Builds.propTypes = {
  onRefresh: T.func.isRequired,
  repository: T.object.isRequired,
  builds: T.arrayOf(T.object),
  refreshTime: T.number
}

const mapStateToProps = ({selectedProject: {repository}, builds}) => ({repository, builds})

const mapDispatchToProps = dispatch => ({
  onRefresh: () => dispatch(refreshBuilds())
})

export {Builds}

export default connect(mapStateToProps, mapDispatchToProps)(Builds)

