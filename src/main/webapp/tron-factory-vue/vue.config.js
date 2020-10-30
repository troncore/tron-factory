/**
 * https://cli.vuejs.org/config/
 */
const path = require('path')

const execa = require('execa')
const branch = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout

function resolve (dir) {
 return  path.resolve(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'


console.log('process.version: ', process.version)

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
      // mock platform:  http://rap2.taobao.org/
      '/__mock__': {
        target: 'http://rap2.taobao.org:38080/app/mock/246117',
        changeOrigin: true,
        pathRewrite: { '^/__mock__': '' },
      },
      '/__server__': {
        target: 'http://47.252.2.112:8080',
        changeOrigin: true,
        pathRewrite: { '^/__server__': '' },
      },
    },
    host: '127.0.0.1',
    port: 8090,
    overlay: {
      warnings: false,
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
  chainWebpack: (config) => {
    // https://cli.vuejs.org/config/#chainwebpack
    config
      .plugin('define')
        .tap(args => {
          args[0]['process.env.GIT_BRANCH'] = JSON.stringify(branch)
          // 默认情况下： process.version = undefined
          // vue 引入solidity 编译器 solc 会校验npm包graceful-fs 中的 process.version
          args[0]['process.version'] = JSON.stringify('')
          return args
        })

    // GraphQL Loader
    config.module
      .rule('graphql')
        .test(/\.gql$/)
        .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
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
