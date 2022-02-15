const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = function ReactNativeWebConfig (path) {
  const env = dotenv.config({ path }).parsed
  return new webpack.DefinePlugin({
    __REACT_NATIVE_WEB_CONFIG__: JSON.stringify(env)
  })
}
