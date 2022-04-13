module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/app': {
        target: 'http://ttapi.research.itcast.cn/', // 需要请求的url
        // pathRewrite: { '^/api': '/app' },
        // ws: true, //是否打开即时通讯协议
        changeOrigin: true
      }
    }
  }
}
