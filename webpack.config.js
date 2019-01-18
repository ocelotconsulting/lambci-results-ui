const { env } = process
const path = require('path')
const webpack = require('webpack')

const devApiUrl = env.DEV_API_URL

const apiUrl = devApiUrl || env.API_URL

if (!apiUrl) {
  console.error('missing DEV_API_URL || API_URL')
}

const rules = (() => {
  const result = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.less/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    }
  ]

  const resources = {
    eot: 'vnd.ms-fontobject',
    ttf: 'application/font-sfnt',
    woff: 'application/font-woff',
    woff2: 'application/font-woff2',
    svg: 'image/svg+xml',
    jpg: 'image/jpg',
    png: 'image/png',
    gif: 'image/gif'
  }

  // anything smaller than 50K will be embedded as url(data:...)
  // larger files will be emitted
  const addUrlLoader = (extension, mimeType) => {
    result.push({
      test: new RegExp(`\\.${extension}$`, 'i'),
      use: {
        loader: 'url-loader',
        options: {
          mimetype: mimeType,
          limit: 50000,
          name: '[name].[ext]'
        }
      }
    })
  }

  for (let extension in resources) {
    addUrlLoader(extension, resources[extension])
  }

  return result
})()

module.exports = {
  mode: 'development',
  entry: {
    bundle: ['@babel/polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  module: { rules },
  resolve: {
    alias: {
      superagent: path.join(__dirname, 'node_modules/superagent/superagent.js')
    }
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial'
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV || (devApiUrl ? 'development' : 'production')),
        API_URL: JSON.stringify(apiUrl || '/api')
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
