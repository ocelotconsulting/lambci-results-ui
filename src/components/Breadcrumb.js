import React, {PropTypes as T} from 'react'
import {Link} from 'react-router'

const getPath = (path, i) =>
  `/${path.slice(0, i + 1).map(({segment}) => encodeURIComponent(segment)).join('/')}`

const Breadcrumb = ({path}) => (
  <ol className="breadcrumb">
    {path.map(({content, active}, i) => (
      <li key={i} className={active ? 'active' : undefined}>
        {active ? content : (<Link to={getPath(path, i)}>{content}</Link>)}
      </li>
    ))}
  </ol>
)

Breadcrumb.displayName = 'Breadcrumb'

Breadcrumb.propTypes = {
  path: T.array.isRequired
}

export default Breadcrumb
