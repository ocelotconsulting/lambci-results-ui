import React from 'react'
import T from 'prop-types'
import moment from 'moment'
import BuildColumn from './BuildColumn'
import StatusColumn from './StatusColumn'
import CommitColumn from './CommitColumn'
import UserColumn from './UserColumn'
import compact from 'lodash/compact'

const dateTimeString = (endDate) => {
  const midnightToday = moment().set({ h: 0, m: 0, s: 0, ms: 0 })
  const dateString = moment(endDate) < midnightToday && endDate.toLocaleDateString()

  return compact([dateString, endDate.toLocaleTimeString()]).join(' ')
}

const renderTime = (startedAt, endedAt) => {
  if (endedAt) {
    const end = moment(endedAt)
    const duration = moment.duration(end - moment(startedAt))
    const hours = Math.floor(duration.asHours())
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    const pl = v => v === 1 ? '' : 's'

    const hourString = hours > 0 ? `${hours} hour${pl(hours)}, ` : ''

    const minuteString = hours > 0 || minutes > 0 ? `${minutes} minute${pl(minutes)}, ` : ''

    return `${dateTimeString(end.toDate())} (${hourString}${minuteString}${seconds} second${pl(seconds)})`
  } else {
    return `started ${dateTimeString(moment(startedAt).toDate())}`
  }
}

const BuildRow = ({ projectId, repository, build }) => {
  const { buildNum, endedAt, startedAt, status, checkoutBranch, commit, user } = build
  return (
    <tr>
      <BuildColumn projectId={projectId} buildNum={buildNum}/>
      <StatusColumn status={status}/>
      <td className='branch'>
        {checkoutBranch}
      </td>
      <td className='time'>
        {renderTime(startedAt, endedAt)}
      </td>
      <CommitColumn repository={repository} commit={commit}/>
      <UserColumn user={user} repository={repository}/>
    </tr>
  )
}

BuildRow.displayName = 'BuildRow'

BuildRow.propTypes = {
  projectId: T.string.isRequired,
  repository: T.object.isRequired,
  build: T.object.isRequired
}

export default BuildRow
