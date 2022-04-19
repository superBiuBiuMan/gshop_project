const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target:"http://39.99.186.36",
  //       changeOrigin:true,//支持跨域
  //     }
  //   }
  // }
})