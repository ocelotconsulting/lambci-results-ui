import React, {PropTypes as T} from 'react'
import endsWith from 'underscore.string/endsWith'
import encode from '../encode'

const BuildLink = ({bucketId, projectId, buildNum, files}) => {
  const fileName = files.find(f => endsWith(f, '.html'))

  const url = fileName &&
    `/api/buckets/${encode(bucketId)}/projects/${encode(projectId)}/builds/${buildNum}/${fileName}`

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
