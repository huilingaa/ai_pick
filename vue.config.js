const vConsolePlugin = require('vconsole-webpack-plugin')
const BASE_URL = process.env.VUE_APP_BASE_URL
const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  devServer: {
    open: true
  },
  configureWebpack: {
    plugins: [
      // new vConsolePlugin({
      //   filter: [],
      //   enable: !IS_PROD
      // })
    ]
  }
}
