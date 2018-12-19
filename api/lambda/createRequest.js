module.exports = (params, { body, headers, queryStringParameters }) =>
  Object.assign(
    {
      params,
      headers: headers || {}, // can be null when lambda is invoked
      query: queryStringParameters || {}
    },
    body ? { body: JSON.parse(body) } : undefined
  )
