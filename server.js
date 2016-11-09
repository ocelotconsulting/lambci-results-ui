const express = require('express')
const {html} = require('./page')

const app = express()

app.use('/api', require('./api'))

if (process.env.NODE_ENV !== 'production') {
  require('./enableDevMode')(app)
}

app.use('/', express.static('public'))

app.get('/*', (req, res) => {
  res.cookie('lambci-ui-express', 'true')
  res.send(html)
})

const port = parseInt(process.env.PORT, 10) || 3000

// error handler
// noinspection JSUnusedLocalSymbols
app.use('/', (error, req, res, next) => {
  error.stack && console.error(error.stack)
  res.status(500).json(error)
})

app.listen(port, () => console.log(`running: http://localhost:${port}`))
