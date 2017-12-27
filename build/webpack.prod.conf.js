var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env//配置全局环境为生产环境
    }),
    new webpack.optimize.UglifyJsPlugin({//js文件压缩插件
      compress: {//压缩配置
        warnings: false//不显示警告
      },
      sourceMap: true//生成soruceMap文件
    }),
    // extract css into its own file
    new ExtractTextPlugin({//将js中引入的css分离的插件
      filename: utils.assetsPath('css/[name].[contenthash].css')//分理处的css文件名
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //压缩提取出的css，并解决ExtractTextPlugin分离出的js 重复问题（多个文件引入同一css文件）
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    //生成html的插件，引入css文件和js 文件
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,//生成的html的文件名
      template: 'index.html',//依据的模板
      inject: true,//注入的js文件将会被放在body标签中，当值为‘head’时，将被放在head标签中
      minify: {//压缩配置
        removeComments: true,//删除html中的注释代码
        collapseWhitespace: true,//删除html中的空白符
        removeAttributeQuotes: true//删除html元素中属性的引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    //分离公共js到vendor中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',//文件名
      minChunks: function (module, count) {//声明公共的模块来自node_modules文件夹
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    //下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    //赋值静态资源，将static文件内的内容复制到制定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']//忽视.*文件
      }
    ])
  ]
})
//额外配置
if (config.build.productionGzip) {//配合文件开启了gzip
  //引入压缩文件的组件。该插件会对生成的文件进行压缩，生成一个.gz文件
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',//目标文件名
      algorithm: 'gzip',//使用gzip
      test: new RegExp(//满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,//资源文件大于1024B = 10KB时会被压缩
      minRatio: 0.8//最小压缩比达到0.8时才会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
