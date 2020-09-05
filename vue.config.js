const webpack = require('webpack')
const { description } = require('./package.json')
const CompressionPlugin = require('compression-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --always --dirty="-dev"',
  commithashCommand: 'log --max-count=1 --no-merges --pretty="%ai|%s"'
})

function getFullDate () {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `"${year}-${month}-${day} ${hour}:${minute}:${second}"`
}

module.exports = {
  publicPath: './',
  devServer: {
    port: 9372,
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    const APP_VERSION = new webpack.DefinePlugin({
      'process.env': {
        APP_VERSION: getFullDate(), // 生成发布版本号,调用 process.env.APP_VERSION
      },
    })

    // build mode
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.VUE_APP_MODE === 'demo'
    ) {
      return {
        devtool: 'source-map',
        plugins: [
          APP_VERSION,
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false, //是否删除原文件
          }),
        ],
      }
    }

    // dev mode
    return {
      name: description,
      plugins: [
        APP_VERSION,
        gitRevisionPlugin,
        new webpack.DefinePlugin({
          'process.VERSION': JSON.stringify(gitRevisionPlugin.version()),
          'process.COMMIT': JSON.stringify(gitRevisionPlugin.commithash())
          // 'process.BRANCH': JSON.stringify(gitRevisionPlugin.branch())
        })],
    }
  },
}
