import React, {PropTypes as T} from 'react'
import BuildRow from './BuildRow'

const BuildTable = ({bucketId, projectId, githubProject, builds}) =>
  <table className='table table-striped'>
    <thead>
    <tr>
      <th>#</th>
      <th>Status</th>
      <th>Branch</th>
      <th>Time</th>
      <th>Commit</th>
      <th>User</th>
    </tr>
    </thead>
    <tbody>
    {builds.map(build => (
      <BuildRow key={build.buildNum} bucketId={bucketId} projectId={projectId}
                githubProject={githubProject} build={build}/>
    ))}
    </tbody>
  </table>

BuildTable.displayName = 'BuildTable'

BuildTable.propTypes = {
  bucketId: T.string.isRequired,
  projectId: T.string.isRequired,
  githubProject: T.string.isRequired,
  builds: T.arrayOf(T.object)
}

export default BuildTable
