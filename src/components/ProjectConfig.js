import React, {PropTypes as T} from 'react'
import Spinner from './Spinner'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import RepositoryLink from './RepositoryLink'
import updateConfigField from '../actions/updateConfigField'
import saveConfig from '../actions/saveConfig'
import deleteBranch from '../actions/deleteBranch'

const showBreadcrumbs = (segments) => {
  const encodedSegments = segments.map((segment) => encodeURIComponent(segment))
  const components = segments.map((segment, i) =>
    segments.length === i + 1 ? <li key="crumb-terminal" className="active">{segment}</li> :
    <li key={`crumb-${i}`}>
      <Link to={'/' + encodedSegments.slice(0, i + 1).join('/')}>{segment}</Link>
    </li>)
  return <ol className="breadcrumb">{components}</ol>
}

const showBranches = (location, branch, branches) => branch ? undefined : typeof branches === 'undefined' || Object.keys(branches).length === 0 ?
  <div>No Branches are defined</div> :
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

const showRemoveBranch = (branch, onClick) => branch ?
  <button type="button" className="danger" onClick={onClick}>Remove</button> : undefined

const configType = (branch) => branch ? `Branch Configuration '${branch}'` : 'Project Configuration'

const ProjectConfig = ({repository, config, onChange, onCheck, params: {projectId, branch}, onSave, location, onDeleteBranch}) => {
  return config ? (
    <div className='container config'>
      {branch ? showBreadcrumbs(['projects', projectId, 'config', branch]) : showBreadcrumbs(['projects', projectId, 'config'])}

      <h3>
        <RepositoryLink repository={repository}/>
        {' '}
        <small>{configType(branch)}</small>
      </h3>

      <div>
        <label>Build</label>
        <input name="build" type='checkbox' checked={config.build || false} onChange={onCheck('build')} />
      </div>

      <div>
        <div>
          <label>Command</label>
        </div>
        <textarea name="cmd" value={ config.cmd || ''} onChange={onChange('cmd')} placeholder='Default'/>
      </div>

      <div>
        <div>
          <label>Environment Variables</label>
        </div>
        <textarea name="env" value={ config.env || ''} onChange={onChange('env')} placeholder='Default'/>
      </div>

      {showBranches(location, branch, config.branches)}

      {branch ? undefined : <div>
          <label>New Branch</label>
          <input type="text" onChange={onChange('newBranch')}></input>
        </div>
      }

      {showRemoveBranch(branch, onDeleteBranch(projectId, branch))}
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
  onDeleteBranch: T.func.isRequired
}

const mapStateToProps = ({projects: {selected: {repository}}, config: {editing}}) =>
  ({repository, config: editing})

const mapDispatchToProps = dispatch => {
  const onChange = (prop, targetProperty = 'value') =>
    ({target}) =>
      dispatch(updateConfigField(prop, target[targetProperty]))
   return {
    onSave: (projectId, branch) => () => dispatch(saveConfig(projectId, branch)),
    onChange: (prop) => onChange(prop),
    onCheck: (prop) => onChange(prop, 'checked'),
    onDeleteBranch: (projectId, branch) => () => dispatch(deleteBranch(projectId, branch))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConfig)
