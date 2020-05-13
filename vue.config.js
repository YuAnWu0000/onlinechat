module.exports = {
  devServer: {
    // https: true, // 否則無法與後端https連線 會出現network error
    disableHostCheck: true, //解決ngrok無法映射的問題
  }
}