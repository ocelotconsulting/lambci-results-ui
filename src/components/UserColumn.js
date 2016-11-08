import React, {PropTypes as T} from 'react'
import RepositoryLink from './RepositoryLink'

const UserColumn = ({user, github}) => (
  <td className='user'>
    {github ? (<RepositoryLink githubPath={user}/>) : user}
  </td>
)

UserColumn.displayName = 'BuildColumn'

UserColumn.propTypes = {
  user: T.string.isRequired,
  github: T.bool.isRequired
}

export default UserColumn
