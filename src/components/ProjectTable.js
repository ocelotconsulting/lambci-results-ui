import React, {PropTypes as T} from 'react'
import ProjectRow from './ProjectRow'

const ProjectTable = ({bucketId, projects}) => (
  <table className='table table-striped'>
    <thead>
    <tr>
      <th>Project ID</th>
      <th>Last Built</th>
      <th>Repository</th>
    </tr>
    </thead>
    <tbody>
    {projects.map(
      project => (
        <ProjectRow key={project.id} bucketId={bucketId} project={project}/>
      )
    )}
    </tbody>
  </table>
)

ProjectTable.displayName = 'ProjectTable'

ProjectTable.propTypes = {
  bucketId: T.string.isRequired,
  projects: T.arrayOf(T.object).isRequired
}

export default ProjectTable