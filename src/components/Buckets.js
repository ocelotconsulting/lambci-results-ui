import React from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'

export default ({allBuckets}) => {
  if (!allBuckets) {
    return <Spinner/>
  } else if (allBuckets.length === 0) {
    return <div className='not-found'>no buckets found</div>
  } else {
    return (
      <div className='container'>
        <h3>Lambda CI Instances</h3>
        <ul className='buckets'>
          {allBuckets.map(({id, name}) => (
            <li key={id} className='bucket'>
              <Link to={`/instances/${encodeURIComponent(id)}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}