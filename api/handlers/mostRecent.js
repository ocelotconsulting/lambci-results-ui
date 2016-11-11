const moment = require('moment')

module.exports = (timestampProperty = 'timestamp') =>
  item => moment(item[timestampProperty] || 0).valueOf() * -1
