import React, {PropTypes as T} from 'react'
import BuildRow from './BuildRow'

const BuildTable = ({projectId, repository, builds}) =>
  <table className='table table-striped'>
    <thead>
    <tr>
      <th/>
      <th>Status</th>
      <th>Branch</th>
      <th>Time</th>
      <th>Commit</th>
      <th>User</th>
    </tr>
    </thead>
    <tbody>
    {builds.map(build => (
      <BuildRow key={build.buildNum} projectId={projectId} repository={repository} build={build}/>
    ))}
    </tbody>
  </table>

BuildTable.displayName = 'BuildTable'

BuildTable.propTypes = {
  projectId: T.string.isRequired,
  repository: T.object.isRequired,
  builds: T.arrayOf(T.object)
}

export default BuildTable
