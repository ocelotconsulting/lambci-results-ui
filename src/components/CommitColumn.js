import React, {PropTypes as T} from 'react'
import RepositoryLink from './RepositoryLink'

const CommitColumn = ({githubProject, commit}) => (
  <td className='commit'>
    <RepositoryLink githubPath={githubProject} commit={commit}/>
  </td>
)

CommitColumn.displayName = 'CommitColumn'

CommitColumn.propTypes = {
  githubProject: T.string.isRequired,
  commit: T.string.isRequired
}

export default CommitColumn
