const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// builds faster by transforming files in parallel.
const HappyPack = require('happypack')
// minify your JavaScript. support es6
const TerserPlugin = require('terser-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// display filesize
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 500000,
      maxAssetSize: 1000000
    },
    entry: {
      app: path.join(__dirname, './src/main.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'happypack/loader?id=js'
            }
          }
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['happypack/loader?id=js']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/'
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.vue', '.json', '.jsx'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
        // '@': resolve('src')
      }
    },
    plugins: [
      devMode ? new CleanWebpackPlugin() : new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css'
      }),
      new HappyPack({
        id: 'js',
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['syntax-dynamic-import']
            }
          }
        ]
      }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([{ from: './public', to: './static' }]),
      new webpack.HashedModuleIdsPlugin(),
      new BundleAnalyzerPlugin()
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            },
            chunks: 'initial'
          },
          // common: {
          //   chunks: 'initial',
          //   minChunks: 2
          // }
        }
      },
      concatenateModules: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true
        })
      ]
    }
  }
}
