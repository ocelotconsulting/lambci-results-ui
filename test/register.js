const fs = require('fs')
const path = require('path')

const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.babelrc'), 'utf8'))

const envPreset = [
  '@babel/preset-env',
  {
    targets: {
      node: 'current'
    }
  }
]

const presets = babelConfig.presets.map(name => name === '@babel/preset-env' ? envPreset : name)

require('@babel/register')({ presets })
