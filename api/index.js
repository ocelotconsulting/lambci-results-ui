const express = require('express')

const router = express.Router()

router.use('/*', (req, res) => res.status(404).send('Route not found'))

module.exports = router
