import React, {PropTypes as T} from 'react'
import moment from 'moment'
import classnames from 'classnames'
import BuildColumn from './BuildColumn'
import CommitColumn from './CommitColumn'
import UserColumn from './UserColumn'
import compact from 'lodash/compact'

// const todayFormat =

const dateTimeString = (endDate) => {
  const midnightToday = moment().set({h: 0, m: 0, s: 0, ms: 0})
  const dateString = moment(endDate) < midnightToday && endDate.toLocaleDateString()

  return compact([dateString, endDate.toLocaleTimeString()]).join(' ')
}

const renderTime = (startedAt, endedAt) => {
  const end = moment(endedAt)
  const duration = moment.duration(end - moment(startedAt))
  const hours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  const pl = v => v === 1 ? '' : 's'

  const hourString = hours > 0 ? `${hours} hour${pl(hours)}, ` : ''

  const minuteString = hours > 0 || minutes > 0 ? `${minutes} minute${pl(minutes)}, ` : ''

  return `${dateTimeString(end.toDate())} (${hourString}${minuteString}${seconds} second${pl(seconds)})`
}

const BuildRow = ({bucketId, projectId, githubProject, build: {
  buildNum, endedAt, startedAt, status, checkoutBranch, files, commit, user
}}) => (
  <tr>
    <BuildColumn bucketId={bucketId} projectId={projectId} buildNum={buildNum} files={files}/>
    <td className={classnames('build-status', {success: status === 'success', danger: status === 'failure'})}>
      {status}
    </td>
    <td className='branch'>
      {checkoutBranch}
    </td>
    <td className='time'>
      {renderTime(startedAt, endedAt)}
    </td>
    <CommitColumn githubProject={githubProject} commit={commit}/>
    <UserColumn user={user} github={Boolean(user && githubProject)}/>
  </tr>
)

BuildRow.displayName = 'BuildRow'

BuildRow.propTypes = {
  bucketId: T.string.isRequired,
  projectId: T.string.isRequired,
  build: T.object.isRequired
}

export default BuildRow
