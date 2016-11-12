module.exports = ({params, body, headers, query}) =>
  ({params, body: body && JSON.parse(body), headers, query})
