import React, {PropTypes as T} from 'react'
import {Link} from 'react-router'

const BuildColumn = ({projectId, buildNum}) => (
  <td className='build-number-link'>
    <Link to={`/projects/${encodeURIComponent(projectId)}/builds/${buildNum}`}>
      {`#${buildNum}`}
    </Link>
  </td>
)

BuildColumn.displayName = 'BuildColumn'

BuildColumn.propTypes = {
  projectId: T.string.isRequired,
  buildNum: T.number.isRequired
}

export default BuildColumn
