import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import encode from '../encode'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../store/project/actions/updateConfigField'
import saveConfig from '../store/project/actions/saveConfig'
import addBranchConfig from '../store/project/actions/addBranchConfig'
import Config from './Config'

const branchConfigs = (config) =>
  Object.keys(config.branches || {}).map((branch) => <Config config={config.branches[branch]} branch={branch} key={branch} />)

const ProjectConfig = ({repository, config, onChange, addBranchConfig, params: {bucketId, projectId}, onSave}) => {
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

      <Config config={config} branch="" key="_"/>
      {branchConfigs(config)}

      <div>
        <input type="text" value = {config._newBranchName || ""} onChange={onChange('_newBranchName')}/>
        <button type="button" onClick={addBranchConfig}>Add</button>
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
  onSave: () => dispatch(saveConfig()),
  onChange: (prop, branch) =>
      (e) => dispatch(updateConfigField(prop, e.target.value)),
  addBranchConfig: (e) => dispatch(addBranchConfig())

})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
