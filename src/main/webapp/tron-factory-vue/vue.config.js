/**
 * https://cli.vuejs.org/config/
 */
const path = require('path')
function resolve (dir) {
 return  path.resolve(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '/',
  outputDir: isProduction ? '../../resources/static' : 'dist',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/__local__': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/__local__': '' },
      },
      '/__server__': {
        target: 'http://47.252.2.112:8080',
        changeOrigin: true,
        pathRewrite: { '^/__server__': '' },
      }
    },
    host: '127.0.0.1',
    port: 8090,
    overlay: {
      warnings: true,
      errors: true,
      open: true,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: () => {
    // https://cli.vuejs.org/config/#chainwebpack
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/base.scss";`
      },
    },
  },
  lintOnSave: false,
}
