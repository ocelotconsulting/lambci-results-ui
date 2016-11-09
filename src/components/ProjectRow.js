import React, {PropTypes as T} from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import RepositoryLink from './RepositoryLink'
import encode from '../encode'

const ProjectRow = ({bucketId, project: {id, lastTimestamp, repository}}) => (
  <tr>
    <td className='id'>
      <Link to={`/instances/${encode(bucketId)}/${encode(id)}`}>
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
  bucketId: T.string.isRequired,
  project: T.object.isRequired
}

export default ProjectRow