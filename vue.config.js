const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://121.42.230.80', // 实际请求地址
        target: 'http://visit.lening365.com/visit',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      }

    }
  }
})
