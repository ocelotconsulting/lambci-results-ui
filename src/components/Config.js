import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import updateConfigField from '../store/project/actions/updateConfigField'

const Config = ({branch, config, onChange, onCheck}) => {
  return config ? <div>
    <h3>{branch}</h3>

    <div className="configProperty">
      <div>Command</div>
      <textarea value={ config.cmd || ''} onChange={onChange('cmd', branch)} placeholder='Default'/>
    </div>

    <div className="configProperty">
      <div>Environment Variables</div>
      <textarea value={ config.env || ''} onChange={onChange('env', branch)} placeholder='None'/>
    </div>

    <div className="configProperty">
      <div>Build</div>
      <input type='checkbox' checked={ config.build || false} onChange={onCheck('build', branch)} />
    </div>
  </div> : <div/>
}

Config.displayName = 'Configuration'

Config.propTypes = {
  branch: T.string,
  config: T.object
}

const mapDispatchToProps = dispatch => ({
  onChange: (prop, branch) =>
      (e) => dispatch(updateConfigField(prop, e.target.value, branch)),
  onCheck: (prop, branch) =>
      (e) => dispatch(updateConfigField(prop, e.target.checked, branch))
})

export default connect(() => ({}), mapDispatchToProps)(Config)
