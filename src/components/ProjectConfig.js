import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import encode from '../encode'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../store/project/actions/updateConfigField'
import saveConfig from '../store/project/actions/saveConfig'

const ProjectConfig = ({onChange, onSave, repository, config, params: {bucketId, projectId}}) => {
  return typeof config !== 'undefined' ? (
    <div className='container'>
      <ol className="breadcrumb">
        <li>
          <Link to={`/instances/${encode(bucketId)}`}>Projects</Link>
        </li>
        <li className="active">
          {`${projectId}`}
        </li>
      </ol>
      <h3>
        <RepositoryLink repository={repository}/>
        {' '}
        <small>config</small>
      </h3>

      <div className="configProperty">
        <div>Command</div>
        <textarea value={config.cmd || ''} onChange={onChange('cmd')} placeholder='Default'/>
      </div>

      <div className="configProperty">
        <div>Environment Variables</div>
        <textarea value={config.env || ''} onChange={onChange('env')} placeholder='None'/>
      </div>

      <div className="configProperty">
        <div>Build Branches</div>
        <input type='text' value={config.branches || ''} onChange={onChange('branches')} placeholder='None'/>
      </div>

      <button type="button" onClick={onSave}>Save</button>

    </div>
  ) : (
    <Spinner/>
  )
}

ProjectConfig.displayName = 'Project Configuration'

ProjectConfig.propTypes = {
  config: T.object,
  repository: T.object
}

const mapStateToProps = ({project: {repository, config}}) => ({repository, config})
const mapDispatchToProps = dispatch => ({
  onChange: (prop) =>
      (e) => dispatch(updateConfigField(prop, e.target.value)),
  onSave: () => dispatch(saveConfig(config))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
