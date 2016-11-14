import React, {PropTypes as T} from 'react'

const SleepOverlay = ({projectId, onWakeUp}) => (
  <div className='sleep-overlay'>
    <div className='backdrop'/>
    <div className='content'>
      <div>
        <div>
          {`No longer checking for updates of project '${projectId}' `}
        </div>
        <div className='actions'>
          <a href='#' onClick={e => {e.preventDefault(); onWakeUp()}}>refresh now</a>
        </div>
      </div>
    </div>
  </div>
)

SleepOverlay.propTypes = {
  projectId: T.string.isRequired,
  onWakeUp: T.func.isRequired
}

SleepOverlay.displayName = 'SleepOverlay'

export default SleepOverlay
