import React, {PropTypes as T} from 'react'

const RepositoryLink = ({githubPath, commit}) => {
  const displayValue = commit ? commit.slice(0, 10) : githubPath

  if (githubPath) {
    return (
      <a href={`https://github.com/${githubPath}${commit ? `/commit/${commit}` : ''}`}>
        <i className='fa fa-github'/>
        {' '}
        {displayValue}
      </a>
    )
  } else {
    return (
      <span>{displayValue}</span>
    )
  }
}

RepositoryLink.displayName = 'RepositoryLink'

RepositoryLink.propTypes = {
  githubPath: T.string.isRequired,
  commit: T.string
}

export default RepositoryLink
