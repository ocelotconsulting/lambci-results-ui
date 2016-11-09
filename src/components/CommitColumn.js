import React, {PropTypes as T} from 'react'
import RepositoryLink from './RepositoryLink'

const CommitColumn = ({repository, commit}) => (
  <td className='commit'>
    <RepositoryLink repository={repository} commit={commit}/>
  </td>
)

CommitColumn.displayName = 'CommitColumn'

CommitColumn.propTypes = {
  repository: T.string.isRequired,
  commit: T.string.isRequired
}

export default CommitColumn
