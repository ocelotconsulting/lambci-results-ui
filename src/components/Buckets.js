import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Spinner from './Spinner'

const Buckets = ({allBuckets}) => {
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

Buckets.displayName = 'Buckets'

Buckets.propTypes = {
  allBuckets: T.arrayOf(T.object)
}

const mapStateToProps = (state) => ({
  allBuckets: state.buckets.all
})

export default connect(mapStateToProps, () => ({}))(Buckets)
