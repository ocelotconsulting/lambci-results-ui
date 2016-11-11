import React, {PropTypes as T} from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import RepositoryLink from './RepositoryLink'
import encode from '../encode'

const ProjectRow = ({project: {id, lastTimestamp, repository}}) => (
  <tr>
    <td className='id'>
      <Link to={`/projects/${encode(id)}/builds`}>
        {id}
      </Link>
    </td>
    <td className='last-build-time'>
      {(lastTimestamp && moment(lastTimestamp).fromNow()) || 'no builds'}
    </td>
    <td className='repository'>
      <RepositoryLink repository={repository}/>
    </td>
  </tr>
)

ProjectRow.displayName = 'ProjectRow'

ProjectRow.propTypes = {
  project: T.object.isRequired
}

export default ProjectRow