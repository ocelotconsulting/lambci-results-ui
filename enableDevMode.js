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

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('!!! AWS credentials missing !!!')
  console.error('!!! set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables !!!')
}

module.exports = app => {
  app.use(devMiddleware(webpack(webpackDevConfig), middlewareOptions))
  app.use(lessMiddleware('src', {dest: 'public'}))
}
