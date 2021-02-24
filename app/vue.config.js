/*
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 14:10:49
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-24 14:13:29
 */
const path = require('path')
const webpack = require('webpack')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/';
module.exports  = {
  runtimeCompiler: true,
  publicPath: './',
  assetsDir:'./',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
      host:'0.0.0.0',
      port:8080,
      inline: true,
      disableHostCheck: true,
      open:true, 
      overlay:true,
      quiet: true,
      // proxy: 'https://11.12.115.114:9998',
      // proxy: 'http://11.12.115.114:8080'
      // proxy: 'https://11.12.115.112:9998',
    },
    chainWebpack(config) {
      config.output.filename('[name].[hash].js').end();
    },
    configureWebpack: {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
    }
}