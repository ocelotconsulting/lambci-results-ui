
// express-like response object for lambda
module.exports = callback => {
  let statusCode = '200'
  // gateway CORS support does not seem to work, so always send CORS
  let headers = {
    'Access-Control-Allow-Origin': '*'
  }

  let body

  const end = () => callback(null, { statusCode, body, headers })

  return {
    type (mimeType) {
      headers['Content-Type'] = mimeType
      return this
    },
    status (code) {
      statusCode = String(code)
      return this
    },
    set (headerName, headerValue) {
      if (typeof headerName === 'string') {
        headers[headerName] = headerValue
      } else {
        Object.assign(headers, headerName)
      }
      return this
    },
    json (object) {
      body = JSON.stringify(object)
      headers['Content-Type'] = 'application/json'
      end()
    },
    send (textBody = '') {
      body = textBody
      end()
    }
  }
}
