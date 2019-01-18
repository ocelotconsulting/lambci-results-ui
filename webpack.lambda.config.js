const path = require('path')
const webpack = require('webpack')
const { stackName } = require('./api/config')

module.exports = {
  mode: 'production',
  entry: './api/lambda/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  target: 'node',
  module: {},
  devtool: 'source-map',
  externals: ['aws-sdk'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        LAMBCI_STACK_NAME: `"${stackName}"`
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
