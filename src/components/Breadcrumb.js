import flatten from 'lodash/flatten'
import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router'

const allSegments = path => flatten(path.map(({ segment }) => segment))

const getPath = (path, i) =>
  `/${allSegments(path.slice(0, i + 1)).map(encodeURIComponent).join('/')}`

const getImage = (image) => image ? <i className={image} /> : undefined

const Breadcrumb = ({ path }) => (
  <ol className="breadcrumb">
    {path.map(({ content, active, hidden, image }, i) => (
      hidden ? undefined : <li key={i} className={active ? 'active' : undefined}>
        {active ? <span>{getImage(image)}{content}</span> : (<Link to={getPath(path, i)}>
            {getImage(image)}{' '}{content}
          </Link>
        )}
      </li>
    ))}
  </ol>
)

Breadcrumb.displayName = 'Breadcrumb'

Breadcrumb.propTypes = {
  path: T.array.isRequired
}

export default Breadcrumb
