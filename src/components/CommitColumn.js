import React from 'react'
import T from 'prop-types'
import RepositoryLink from './RepositoryLink'

const CommitColumn = ({ repository, commit }) => (
  <td className='commit'>
    <RepositoryLink repository={repository} commit={commit}/>
  </td>
)

CommitColumn.displayName = 'CommitColumn'

CommitColumn.propTypes = {
  repository: T.object.isRequired,
  commit: T.string.isRequired
}

export default CommitColumn
