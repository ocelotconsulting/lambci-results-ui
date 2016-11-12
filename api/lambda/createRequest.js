module.exports = ({params, body, headers}) =>
  ({params, body: body && JSON.parse(body), headers})
