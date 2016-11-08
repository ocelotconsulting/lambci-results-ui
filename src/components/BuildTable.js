import React, {PropTypes as T} from 'react'
import Build from './Build'

const BuildTable = ({bucketId, projectId, builds}) =>
  <table className='table table-striped'>
    <thead>
    <tr>
      <th>#</th>
      <th>Status</th>
      <th>Branch</th>
      <th>Time</th>
    </tr>
    </thead>
    <tbody>
    {builds.map(build => (
      <Build key={build.buildNum} bucketId={bucketId} projectId={projectId} build={build}/>
    ))}
    </tbody>
  </table>

BuildTable.displayName = 'BuildTable'

BuildTable.propTypes = {
  bucketId: T.string,
  projectId: T.string,
  builds: T.arrayOf(T.object)
}

export default BuildTable
