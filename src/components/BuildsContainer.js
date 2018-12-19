import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import BuildTable from './BuildTable'
import RepositoryLink from './RepositoryLink'
import SleepOverlay from './SleepOverlay'
import Breadcrumb from './Breadcrumb'
import BuildPager from './BuildPager'
import wakeBuildRefresh from '../actions/wakeBuildRefresh'
import selectNewPage from '../actions/selectNewPage'

export const Builds = ({
  repository, paging, builds, sleeping, lastTimestamp, onWakeUp, params: { projectId }, onPageChanged
}) => (
  <div className='container builds'>
    {
      sleeping ? (<SleepOverlay lastTimestamp={lastTimestamp} onWakeUp={onWakeUp}/>) : undefined
    }
    <Breadcrumb path={[
      { segment: 'projects', content: 'Projects' },
      { segment: projectId, content: projectId, active: true }
    ]}/>
    <h3>
      <RepositoryLink repository={repository}/>
      {' '}
      <small>builds</small>
    </h3>
    {!builds && (<Spinner/>)}
    {builds && (
      <BuildPager page={paging.page} nextEnabled={paging.nextEnabled} previousEnabled={paging.previousEnabled}
                  onPrevious={() => onPageChanged(-1)} onNext={() => onPageChanged(1)}/>
    )}
    {builds && (<BuildTable projectId={projectId} builds={builds} repository={repository}/>)}
  </div>
)

Builds.displayName = 'Builds'

Builds.propTypes = {
  repository: T.object.isRequired,
  sleeping: T.bool.isRequired,
  lastTimestamp: T.number.isRequired,
  paging: T.object.isRequired,
  builds: T.arrayOf(T.object),
  onWakeUp: T.func.isRequired,
  onPageChanged: T.func.isRequired
}

export const mapStateToProps = ({ projects: { selected: { repository } }, builds: { value, refresh, paging } }) => ({
  repository,
  builds: value,
  paging,
  sleeping: refresh.sleepCount >= refresh.sleepThreshold,
  lastTimestamp: refresh.lastTimestamp
})

export const mapDispatchToProps = dispatch => ({
  onWakeUp: () => dispatch(wakeBuildRefresh()),
  onPageChanged: delta => dispatch(selectNewPage(delta))
})

export default connect(mapStateToProps, mapDispatchToProps)(Builds)
