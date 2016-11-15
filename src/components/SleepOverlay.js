import React, {PropTypes as T} from 'react'
import moment from 'moment'

class SleepOverlay extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {ticks: 0}
    this.tick = this.tick.bind(this)
  }

  tick() {
    this.setState({ticks: this.state.ticks + 1})
    this.tickLater()
  }

  tickLater() {
    this.timeoutId = setTimeout(this.tick, this.props.tickDuration)
  }

  componentDidMount() {
    this.tickLater()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    const {lastTimestamp, onWakeUp} = this.props

    return (
      <div className='sleep-overlay'>
        <div className='backdrop'/>
        <div className='content'>
          <div>
            <div>
              {`last updated ${moment(lastTimestamp || Date.now()).fromNow()}` }
            </div>
            <div className='actions'>
              <a href='#' onClick={e => {e.preventDefault(); onWakeUp()}}>update now</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SleepOverlay.propTypes = {
  lastTimestamp: T.number.isRequired,
  onWakeUp: T.func.isRequired,
  tickDuration: T.number
}

SleepOverlay.defaultProps = {
  tickDuration: 5 * 1000
}

SleepOverlay.displayName = 'SleepOverlay'

export default SleepOverlay
