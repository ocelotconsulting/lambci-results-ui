const webpack = require('webpack')
const {stackName} = require('./api/config')

module.exports = {
  entry: './api/lambda/index.js',
  output: {
    path: 'dist',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  },
  externals: ['aws-sdk'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        LAMBCI_STACK_NAME: `"${stackName}"`
      }
    })
  ]
}