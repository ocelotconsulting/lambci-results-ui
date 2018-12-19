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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }
    ]
  },
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
