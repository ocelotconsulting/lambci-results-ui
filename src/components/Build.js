import React, {PropTypes as T} from 'react'
import moment from 'moment'
import classnames from 'classnames'
import BuildLink from './BuildLink'

// const todayFormat =

const renderTime = (startedAt, endedAt) => {
  const end = moment(endedAt)
  const duration = moment.duration(end - moment(startedAt))
  const hours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  const pl = v => v === 1 ? '' : 's'

  const hourString = hours > 0 ? `${hours} hour${pl(hours)}, ` : ''

  const minuteString = hours > 0 || minutes > 0 ? `${minutes} minute${pl(minutes)}, ` : ''

  return `${end.fromNow()} (${hourString}${minuteString}${seconds} second${pl(seconds)})`
}

const Build = ({bucketId, projectId, build: {buildNum, endedAt, startedAt, status, checkoutBranch, files}}) => (
  <tr>
    <BuildLink bucketId={bucketId} projectId={projectId} buildNum={buildNum} files={files}/>
    <td className={classnames('build-status', {success: status === 'success', danger: status === 'failure'})}>
      {status}
    </td>
    <td className='branch'>
      {checkoutBranch}
    </td>
    <td className='time'>
      {renderTime(startedAt, endedAt)}
    </td>
  </tr>
)

Build.displayName = 'Spinner'

Build.propTypes = {
  bucketId: T.string,
  projectId: T.string,
  build: T.object
}

export default Build
