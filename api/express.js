const AWS = require('aws-sdk')
const {region} = require('./config')
AWS.config.update({region})
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const router = express.Router()
router.use(bodyParser.json())

routes.forEach(route => {
  const {path} = route
  const methods = Object.keys(route).filter(k => k !== 'path')
  methods.forEach(method => router[method](path.id, route[method]))
})

router.use('/*', ({method, originalUrl}, res) => res.status(404).send(`Cannot ${method} ${originalUrl}`))

module.exports = router
