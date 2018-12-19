const querystring = require('querystring')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

process.env.DEV_API_URL = '/api'

const config = {
  ...require('./webpack.config')
}

const hotMiddlewareClientOptions = {
  path: '/__webpack_hmr',
  timeout: 20000,
  reload: true
}

const hotMiddlewareClient = `webpack-hot-middleware/client?${querystring.stringify(hotMiddlewareClientOptions)}`

config.entry = {
  ...config.entry,
  bundle: [
    ...config.entry.bundle,
    hotMiddlewareClient
  ]
}

// set path to / since we service /public from /
config.output = { ...config.output, path: '/' }

// don't waste CPU on a full source map
config.devtool = 'cheap-inline-source-map'

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  ...config.plugins
]

const compiler = webpack(config)

console.log('DEV mode')

module.exports = app => {
  app.use('/images', express.static('images'))
  app.use(devMiddleware(compiler, {
    stats: {
      colors: true
    },
    noInfo: true
  }))
  app.use(hotMiddleware(compiler))
}
