const AWS = require('aws-sdk')
const { region } = require('./config')
AWS.config.update({ region })

module.exports = AWS
