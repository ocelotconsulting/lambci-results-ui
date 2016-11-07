import {connect} from 'react-redux'
import Projects from './Projects'

const mapStateToProps = (state) => ({
  selectedBucketId: state.buckets.selected,
  projects: state.buckets.projects
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)
