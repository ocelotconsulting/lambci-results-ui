const webpack = require('webpack')
const fs = require('fs')

const defaultBabelConfig = JSON.parse(fs.readFileSync('.babelrc', {encoding: 'utf8'}))

// webpack 2 should not resolve es2015 imports
const presets = [
  ['es2015', {modules: false}]
].concat(defaultBabelConfig.presets.filter(v => v !== 'es2015'))

const babelConfig = Object.assign({}, defaultBabelConfig, {babelrc: false, presets})

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: babelConfig
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  ]
}
