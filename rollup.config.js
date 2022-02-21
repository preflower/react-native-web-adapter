import path from 'path'
import ts from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-import-css'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))
const packageOptions = pkg.buildOptions || {}

const outputConfigs = {
  esm: {
    file: resolve('dist/index.esm-bundler.js'),
    format: 'es'
  },
  cjs: {
    file: resolve('dist/index.cjs.js'),
    format: 'cjs'
  }
}

const defaultFormats = ['esm', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats

const packageConfigs = process.env.PROD_ONLY
  ? []
  : packageFormats.map(format => createConfig(format, outputConfigs[format]))

function createConfig (format, output) {
  output.exports = 'named'
  output.externalLiveBindings = false

  return {
    input: resolve('src/index.ts'),
    external: [
      /@babel\/runtime/,
      'react',
      'react-dom',
      'react-native'
    ],
    output,
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      css({
        output: 'index.css',
        minify: true
      })
    ],
    treeshake: {
      moduleSideEffects: false
    }
  }
}

export default packageConfigs
