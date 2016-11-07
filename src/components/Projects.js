import React from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'

export default ({projects, params: {bucketId}}) => projects ? (
  <div className='container'>
    <h3>Projects</h3>
    <ul className='projects'>
      {projects.map(({id}) => (
        <li key={id} className='project'>
          <Link to={`/instances/${encodeURIComponent(bucketId)}/${encodeURIComponent(id)}`}>
            {id}
          </Link>
        </li>
      ))}
    </ul>
  </div>
) : <Spinner/>
