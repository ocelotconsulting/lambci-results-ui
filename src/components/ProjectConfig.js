import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../actions/updateConfigField'
import saveConfig from '../actions/saveConfig'
import addBranchConfig from '../actions/addBranchConfig'

const ProjectConfig = ({repository, config, onChange, onCheck, addBranchConfig, params: {projectId, branch}, onSave}) => {
  const editConfig = config && branch ?  config.branches ? config.branches[branch] : {}  : config
  return config ? (
    <div className='container'>
      <ol className="breadcrumb">
        <li>
          <Link to='/projects'>Projects</Link>
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
        <textarea value={ editConfig.cmd || ''} onChange={onChange('cmd', branch)} placeholder='Default'/>
      </div>

      <div className="configProperty">
        <div>Environment Variables</div>
        <textarea value={ editConfig.env || ''} onChange={onChange('env', branch)} placeholder='None'/>
      </div>

      <div className="configProperty">
        <div>Build</div>
        <input type='checkbox' checked={editConfig.build} onChange={onCheck('build', branch)} />
      </div>

      <button type="button" onClick={onSave(projectId)}>Save</button>
    </div>
  ) : (
    <Spinner/>
  )}

ProjectConfig.displayName = 'ProjectConfig'

ProjectConfig.propTypes = {
  config: T.object,
  repository: T.object.isRequired,
  onSave: T.func.isRequired,
  onChange: T.func.isRequired,
  onCheck: T.func.isRequired,
  addBranchConfig: T.func.isRequired
}

const mapStateToProps = ({projects: {selected: {repository}}, config: {value}}) =>
  ({repository, config: value})

const onChange = (prop, branch, targetProperty = 'value') =>
  ({target}) =>
    dispatch(updateConfigField(prop, target[targetProperty], branch))

const mapDispatchToProps = dispatch => ({
  onSave: (projectId) => () => dispatch(saveConfig(projectId)),
  onChange: (prop, branch) => onChange(prop, branch),
  onCheck: (prop, branch) => onChange(prop, branch, 'checked'),
  addBranchConfig: () => dispatch(addBranchConfig())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
