import React, {PropTypes as T} from 'react'
import endsWith from 'underscore.string/endsWith'
import encode from '../encode'

const BuildColumn = ({bucketId, projectId, buildNum, files}) => {
  const fileName = files.find(f => endsWith(f, '.html'))

  const url = fileName &&
    `/api/buckets/${encode(bucketId)}/projects/${encode(projectId)}/builds/${buildNum}/${fileName}`

  const label = `#${buildNum}`

  return (
    <td className='build-number-link'>
      {fileName ? (<a href={url}>{label}</a>) : label}
    </td>
  )
}

BuildColumn.displayName = 'BuildColumn'

BuildColumn.propTypes = {
  bucketId: T.string.isRequired,
  projectId: T.string.isRequired,
  buildNum: T.number.isRequired,
  files: T.arrayOf(T.string).isRequired
}

export default BuildColumn
