import React, {PropTypes as T} from 'react'
import RepositoryLink from './RepositoryLink'

const UserColumn = ({user, repository}) => (
  <td className='user'>
    <RepositoryLink repository={repository} path={user}/>
  </td>
)

UserColumn.displayName = 'BuildColumn'

UserColumn.propTypes = {
  user: T.string.isRequired,
  repository: T.object.isRequired
}

export default UserColumn
