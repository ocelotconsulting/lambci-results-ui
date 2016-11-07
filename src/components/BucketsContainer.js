import {connect} from 'react-redux'
import Buckets from './Buckets'

const mapStateToProps = (state) => ({
  allBuckets: state.buckets.all
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buckets)
