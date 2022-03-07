import path from 'path'
import ts from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-import-css'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))
const packageOptions = pkg.buildOptions || {}

// ensure TS checks only once for each build
let hasTSChecked = false

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

  const typescript = ts({
    check: !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: !hasTSChecked
      },
      exclude: [
        'example/'
      ]
    }
  })
  hasTSChecked = true

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
      typescript,
      css({
        output: 'index.css',
        minify: true
      }),
      nodeResolve(),
      commonjs()
    ],
    treeshake: {
      moduleSideEffects: false
    }
  }
}

export default packageConfigs
