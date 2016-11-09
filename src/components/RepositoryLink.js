import React, {PropTypes as T} from 'react'

const RepositoryLink = ({repository: {baseUrl, project, icon}, path, commit}) => {
  const pathOrProject = path || project
  const displayValue = commit ? commit.slice(0, 10) : pathOrProject

  if (baseUrl) {
    return (
      <a href={`${baseUrl}/${pathOrProject}${commit ? `/commit/${commit}` : ''}`}>
        <i className={`fa fa-${icon}`}/>
        {' '}
        {displayValue}
      </a>
    )
  } else {
    // repository not supported... just show a value
    return (
      <span>{displayValue}</span>
    )
  }
}

RepositoryLink.displayName = 'RepositoryLink'

RepositoryLink.propTypes = {
  repository: T.object.isRequired,
  path: T.string,
  commit: T.string
}

export default RepositoryLink
