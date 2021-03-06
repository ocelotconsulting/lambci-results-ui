import React from 'react'
import T from 'prop-types'
import Spinner from './Spinner'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../actions/updateConfigField'
import saveConfig from '../actions/saveConfig'
import deleteBranch from '../actions/deleteBranch'
import Breadcrumb from './Breadcrumb'

const showBranches = (location, branch, branches) => {
  if (branch) {
    return undefined
  } else if (!branches || Object.keys(branches).length === 0) {
    return (
      <label>Branch Configurations: None</label>
    )
  } else {
    return (
      <div>
        <label>Branch Configurations</label>
        <ul>
          {Object.keys(branches).map((branch, i) =>
            <li key={`branch-${i}`}>
              <Link to={`${location.pathname}/` + branch}>{branch}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const showRemoveBranch = (branch, onClick) => branch
  ? <button type="button" className="btn btn-warning" onClick={onClick}>Remove</button> : undefined

const showAddBranch = (branch, onChange) => branch ? undefined : <div>
  <label>New Branch</label>
  <input type="text" onChange={onChange}/>
</div>

const showTextArea = (name, value, onChange) => <div>
  <div>
    <label>{name}</label>
  </div>
  <textarea name={name} value={value || ''} onChange={onChange} placeholder='Default'/>
</div>

const configType = (branch) => branch ? `Branch Configuration '${branch}'` : 'Project Configuration'

const ProjectConfig = ({ repository, config, onChange, onCheck, params: { projectId, branch }, onSave, location, onDeleteBranch }) => {
  return config ? (
    <div className='container config'>
      {<Breadcrumb path={[
        { segment: 'projects', content: 'Projects' },
        { segment: projectId, content: projectId, hidden: true },
        { segment: 'config', content: `${projectId}`, active: !branch, image: 'fa fa-cog' },
        { segment: branch, content: branch, active: Boolean(branch), hidden: !branch }
      ]}/>
      }

      <h3>
        <RepositoryLink repository={repository}/>
        {' '}
        <small>{configType(branch)}</small>
      </h3>

      <div>
        <label>Build</label>
        <input name="build" type='checkbox' checked={config.build || false} onChange={onCheck('build')}/>
      </div>

      {showTextArea('Command', config.cmd, onChange('cmd'))}

      {showTextArea('Environment Variables', config.env, onChange('env'))}

      {showBranches(location, branch, config.branches)}

      {showAddBranch(branch, onChange('newBranch'))}

      {showRemoveBranch(branch, onDeleteBranch(projectId, branch))}

      <button type='button' className='btn btn-primary' onClick={onSave(projectId, branch)}>Save</button>
    </div>
  ) : (
    <Spinner/>
  )
}

ProjectConfig.displayName = 'ProjectConfig'

ProjectConfig.propTypes = {
  config: T.object,
  repository: T.object.isRequired,
  onSave: T.func.isRequired,
  onChange: T.func.isRequired,
  onCheck: T.func.isRequired,
  onDeleteBranch: T.func.isRequired
}

const mapStateToProps = ({ projects: { selected: { repository } }, config: { editing } }) =>
  ({ repository, config: editing })

const mapDispatchToProps = dispatch => {
  const onChange = (prop, targetProperty = 'value') =>
    ({ target }) =>
      dispatch(updateConfigField(prop, target[targetProperty]))
  return {
    onSave: (projectId, branch) => () => dispatch(saveConfig(projectId, branch)),
    onChange: (prop) => onChange(prop),
    onCheck: (prop) => onChange(prop, 'checked'),
    onDeleteBranch: (projectId, branch) => () => dispatch(deleteBranch(projectId, branch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
