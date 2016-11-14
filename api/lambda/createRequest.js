module.exports = (params, {body, headers = {}, queryStringParameters = {}}) =>
  Object.assign({params, headers, query: queryStringParameters}, body ? {body: JSON.parse(body)} : undefined)
