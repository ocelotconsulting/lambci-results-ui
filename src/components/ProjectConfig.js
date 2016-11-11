import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../store/actions/updateConfigField'
import saveConfig from '../store/actions/saveConfig'
import addBranchConfig from '../store/actions/addBranchConfig'
import Config from './Config'

const branchConfigs = (config) =>
  Object.keys(config.branches || {}).map(
    branch => (
      <Config config={config.branches[branch]} branch={branch} key={branch}/>
    )
  )

const ProjectConfig = ({repository, config, onChange, addBranchConfig, params: {projectId}, onSave}) =>
  config ? (
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

      <Config config={config} branch="" key="_"/>
      {branchConfigs(config)}

      <div>
        <input type="text" value={config._newBranchName || ""} onChange={onChange('_newBranchName')}/>
        <button type="button" onClick={addBranchConfig}>Add</button>
      </div>

      <button type="button" onClick={onSave}>Save</button>
    </div>
  ) : (
    <Spinner/>
  )

ProjectConfig.displayName = 'ProjectConfig'

ProjectConfig.propTypes = {
  config: T.object,
  repository: T.object.isRequired,
  onSave: T.func.isRequired
}

const mapStateToProps = ({selectedProject: {repository}, config}) => ({repository, config})
const mapDispatchToProps = dispatch => ({
  onSave: () => dispatch(saveConfig()),
  onChange: (prop, branch) =>
    (e) => dispatch(updateConfigField(prop, e.target.value)),
  addBranchConfig: (e) => dispatch(addBranchConfig())

})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
