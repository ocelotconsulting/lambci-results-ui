import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'

const StatusColumn = ({ status }) => (
  <td className={classnames('status', { success: status === 'success', danger: status === 'failure' })}>
    {
      status === 'pending' ? (
        <i className='fa fa-spinner fa-spin'/>
      ) : status
    }
  </td>
)

StatusColumn.displayName = 'StatusColumn'

StatusColumn.propTypes = {
  status: T.string.isRequired
}

export default StatusColumn
