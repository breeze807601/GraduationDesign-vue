const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    client: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4090', // 目标地址
        changeOrigin: true,              //是否跨域
        pathRewrite: {
          '^/api': '' // 路径重写，移除路径中的/api
        }
      }
    }
  },
})