const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API_BASE_URL: `"${process.env.API_BASE_URL || '/api'}"`
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
