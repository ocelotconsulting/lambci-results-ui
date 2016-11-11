import React, {PropTypes as T} from 'react'
import endsWith from 'underscore.string/endsWith'
import encode from '../encode'

const BuildColumn = ({projectId, buildNum, files}) => {
  const fileName = files.find(f => endsWith(f, '.html'))

  const url = fileName && `/api/projects/${encode(projectId)}/builds/${buildNum}/${fileName}`

  const label = `#${buildNum}`

  return (
    <td className='build-number-link'>
      {fileName ? (<a href={url}>{label}</a>) : label}
    </td>
  )
}

BuildColumn.displayName = 'BuildColumn'

BuildColumn.propTypes = {
  projectId: T.string.isRequired,
  buildNum: T.number.isRequired,
  files: T.arrayOf(T.string).isRequired
}

export default BuildColumn
