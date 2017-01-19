import React, {PropTypes as T} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {apiBaseUrl} from '../config'
import IFrame from './IFrame'
import Spinner from './Spinner'
import Breadcrumb from './Breadcrumb'

export class Build extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      loading: true
    }
  }

  render() {
    const {loading} = this.state
    const {projectId, buildNum} = this.props

    return (
      <div className='container build-report'>
        <Breadcrumb path={[
          {segment: 'projects', content: 'Projects'},
          {segment: [projectId, 'builds'], content: projectId},
          {segment: buildNum, content: `Build #${buildNum}`, active: true}
        ]}/>
        <div className='report'>
          {loading && (<Spinner/>)}
          <IFrame className={classnames({hidden: loading})}
                  src={`${apiBaseUrl}/projects/${encodeURIComponent(projectId)}/builds/${buildNum}/report`}
                  onLoad={() => this.setState({loading: false})}/>
        </div>
      </div>
    )
  }
}

Build.displayName = 'Build'

Build.propTypes = {
  projectId: T.string.isRequired,
  buildNum: T.number.isRequired
}

export const mapStateToProps = ({projects, builds}) => ({
  projectId: projects.selected.id,
  buildNum: builds.selected
})

export default connect(mapStateToProps, () => ({}))(Build)
