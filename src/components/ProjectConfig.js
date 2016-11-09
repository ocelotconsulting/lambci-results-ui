import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import encode from '../encode'

const ProjectConfig = ({project}) =>
  typeof project.config !== 'undefined' ? (
    <div className='container'>
      {JSON.stringify(project)}
    </div>
  ) : (
    <Spinner/>
  )

ProjectConfig.displayName = 'Project Configuration'

ProjectConfig.propTypes = {
  config: T.object
}

const mapStateToProps = (state) => ({project: state.project})

export default connect(mapStateToProps, () => ({}))(ProjectConfig)
