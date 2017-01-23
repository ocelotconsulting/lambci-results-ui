const webpack = require('webpack')

module.exports = Object.assign({}, require('./webpack.config'), {
  output: {
    path: '/bundle.js'
  },
  devtool: '#cheap-inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
})
