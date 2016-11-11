module.exports = {
  entry: './api/lambda/index.js',
  output: {
    path: 'lambda',
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
  }
}