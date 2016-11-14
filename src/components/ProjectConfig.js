import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../actions/updateConfigField'
import saveConfig from '../actions/saveConfig'
import addBranchConfig from '../actions/addBranchConfig'

const configName = (branch) => branch ? <small>Branch Configuration '{branch}'</small> : <small>Project Configuration</small>

const ProjectConfig = ({repository, config, onChange, onCheck, addBranchConfig, params: {projectId, branch}, onSave}) => {
  return config ? (
    <div className='container config'>
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
        {configName(branch)}
      </h3>

      <div>
        <label for="build">Build</label>
        <input name="build" type='checkbox' checked={config.build || false} onChange={onCheck('build', branch)} />
      </div>

      <div>
        <div>
          <label>Command</label>
        </div>
        <textarea name="cmd" value={ config.cmd || ''} onChange={onChange('cmd', branch)} placeholder='Default'/>
      </div>

      <div>
        <div>
          <label>Environment Variables</label>
        </div>
        <textarea name="env" value={ config.env || ''} onChange={onChange('env', branch)} placeholder='Default'/>
      </div>

      <button type="button" onClick={onSave(projectId, branch)}>Save</button>
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

const mapStateToProps = ({projects: {selected: {repository}}, config: {editing}}) =>
  ({repository, config: editing})

const mapDispatchToProps = dispatch => {
  const onChange = (prop, targetProperty = 'value') =>
    ({target}) =>
      dispatch(updateConfigField(prop, target[targetProperty]))
   return {
    onSave: (projectId, branch) => () => dispatch(saveConfig(projectId, branch)),
    onChange: (prop, branch) => onChange(prop),
    onCheck: (prop, branch) => onChange(prop, 'checked'),
    addBranchConfig: () => dispatch(addBranchConfig())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
