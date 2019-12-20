/**
 * https://cli.vuejs.org/config/
 */
const isDevelopmentEnv = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/proxy_local': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/proxy_local': '' },
      },
    },
    host: '127.0.0.1',
    port: 8090,
    overlay: {
      warnings: true,
      errors: true,
      open: true,
    },
  },
  configureWebpack: {},
  chainWebpack: () => {
    // https://cli.vuejs.org/config/#chainwebpack
  },
  css: {},
  lintOnSave: isDevelopmentEnv,
}
