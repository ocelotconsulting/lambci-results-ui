module.exports = Object.assign({}, require('./webpack.config'), {
  output: {
    path: '/bundle.js'
  },
  devtool: '#cheap-inline-source-map',
  plugins: []
})
