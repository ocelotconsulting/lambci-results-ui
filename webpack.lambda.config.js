const webpack = require('webpack')

module.exports = {
  entry: './api/lambda/index.js',
  output: {
    path: 'dist',
    libraryTarget: 'commonjs2',
    filename: 'lambdaApi.js'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        LAMBCI_STACK_NAME: `"${process.env.LAMBCI_STACK_NAME}"`
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}