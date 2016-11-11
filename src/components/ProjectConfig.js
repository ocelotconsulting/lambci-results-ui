import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../store/actions/updateConfigField'
import saveConfig from '../store/actions/saveConfig'
import addBranchConfig from '../store/actions/addBranchConfig'

const ProjectConfig = ({repository, config, onChange, onCheck, addBranchConfig, params: {projectId, branch}, onSave}) => {
  console.log('c', config)
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
  onSave: T.func.isRequired
}

const mapStateToProps = ({selectedProject: {repository}, config}) => ({repository, config})
const mapDispatchToProps = dispatch => ({
  onSave: (projectId) => () => dispatch(saveConfig(projectId)),
  onChange: (prop, branch) =>
      (e) => dispatch(updateConfigField(prop, e.target.value, branch)),
  onCheck: (prop, branch) =>
      (e) => dispatch(updateConfigField(prop, e.target.checked, branch)),
  addBranchConfig: (e) => dispatch(addBranchConfig())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
