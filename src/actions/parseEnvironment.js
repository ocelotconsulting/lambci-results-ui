import fromPairs from 'lodash/fromPairs'
import compact from 'lodash/compact'

const parseKeyAndValue = line => {
  // we don't use .split here... we just assume that the first = sign separates key and value
  // that way you can have whatever special chars you want in the value
  // (except for newline and leading/trailing whitespace)
  const equals = line.indexOf('=')
  if (equals > 0) {
    const left = line.slice(0, equals).trim()
    const right = line.slice(equals + 1).trim()
    if (left && right) return [left, right]
  }
}

export default rawEnvironment => fromPairs(compact(rawEnvironment.split('\n').map(parseKeyAndValue)))
