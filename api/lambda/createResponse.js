
// express-like response object for lambda
module.exports = callback => {
  let statusCode = 200
  let headers = {}

  let body = undefined

  const end = () => callback(null, {statusCode, body, headers})

  return {
    // shorthand like 'json' and 'html' not supported
    type: mimeType => {
      headers['Content-Type'] = mimeType
      return this
    },
    status: code => {
      statusCode = code
      return this
    },
    json: (object) => {
      body = JSON.stringify(object)
      headers['Content-Type'] = 'application/json'
      end()
    },
    send: (textBody = '') => {
      body = textBody
      end()
    }
  }
}