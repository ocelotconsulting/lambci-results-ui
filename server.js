const express = require('express')
const html = require('./page')

const app = express()

app.use('/api', require('./api'))

app.use('/font-awesome', express.static('node_modules/font-awesome'))
app.use('/images', express.static('images'))

if (process.env.NODE_ENV !== 'production') {
  console.log('DEV mode')
  const webpack = require('webpack')
  const devMiddleware = require('webpack-dev-middleware')
  const middlewareOptions = {
    stats: {
      colors: true
    },
    noInfo: true
  }
  app.use(devMiddleware(webpack(require('./webpack.dev.config')), middlewareOptions))
  app.use(require('less-middleware')('src', { dest: 'public' }))
}

app.use('/', express.static('public'))

app.get('/*', (req, res) => res.send(html))

const port = parseInt(process.env.PORT, 10) || 3000

// error handler
// noinspection JSUnusedLocalSymbols
app.use('/', (error, req, res, next) => {
  if (error.stack) console.error(error.stack)
  res.status(500).json(error)
})

app.listen(port, () => console.log(`running: http://localhost:${port}`))
