import React, {PropTypes as T} from 'react'
import endsWith from 'underscore.string/endsWith'

const BuildLink = ({bucketId, projectId, buildNum, files}) => {
  const fileName = files.find(f => endsWith(f, '.html'))

  const url = fileName && `/api/buckets/${encodeURIComponent(bucketId)}/projects/${encodeURIComponent(projectId)}/builds/${buildNum}/${fileName}`

  return (
    <td className='build-number-link'>
      {fileName && (<a href={url}>{`#${buildNum}`}</a>)}
    </td>
  )
}

BuildLink.displayName = 'BuildLink'

BuildLink.propTypes = {
  bucketId: T.string,
  projectId: T.string,
  buildNum: T.number,
  files: T.arrayOf(T.string)
}

export default BuildLink
