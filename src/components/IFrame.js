import React, {PropTypes as T} from 'react'

export default class IFrame extends React.Component {
  addOnLoad(iframeNode) {
    if (iframeNode && !this.iframeNode) {
      this.iframeNode = iframeNode
      iframeNode.addEventListener('load', this.props.onLoad)
    }
  }

  componentWillUnmount() {
    this.iframeNode = undefined
  }

  render() {
    return (
      <iframe src={this.props.src} className={this.props.className} ref={n => this.addOnLoad(n)}/>
    )
  }
}

IFrame.propTypes = {
  src: T.string.isRequired,
  onLoad: T.func.isRequired,
  className: T.string
}

IFrame.displayName = 'IFrame'
