const compact = require('lodash/compact')
const startsWith = require('underscore.string/startsWith')

class Path {
  constructor (id) {
    this.id = id
    this.segments = compact(id.split('/')).map(segment =>
      startsWith(segment, ':') ? { param: segment.slice(1) } : { literal: segment }
    )
  }

  parseParams (requestPath) {
    const pathSegments = compact(requestPath.split('/'))

    const matches = i => {
      const segment = this.segments[i]
      return segment.param || segment.literal === pathSegments[i]
    }

    if (pathSegments.length === this.segments.length) {
      const params = {}
      for (let i = 0; i < pathSegments.length; i++) {
        if (matches(i)) {
          const { param } = this.segments[i]
          param && (params[param] = decodeURIComponent(pathSegments[i]))
        } else return
      }
      return params
    }
  }
}

module.exports = Path
