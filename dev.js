const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const lessMiddleware = require('less-middleware')
const webpack = require('webpack')
const webpackDevConfig = require('./webpack.dev.config')

const middlewareOptions = {
  stats: {
    colors: true
  },
  noInfo: true
}

console.log('DEV mode')

module.exports = app => {
  app.use('/images', express.static('images'))
  app.use(devMiddleware(webpack(webpackDevConfig), middlewareOptions))
  app.use(lessMiddleware('css', {dest: 'public'}))
}
