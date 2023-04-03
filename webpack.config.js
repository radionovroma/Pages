const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const PostcssPresetEnv = require('postcss-preset-env')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = () =>{
  return {
    mode,
    target,
    devtool,
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    entry: './src/index.tsx',
    output: {
      assetModuleFilename: 'assets/[contenthash:8].[ext]',
      clean: true,
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: mode === 'development' ? "/" : "/Pages/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [PostcssPresetEnv],
                }
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|webp|gif)$/i,
          type: 'asset/resource',
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]'
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', 'jsx', '.js'],
      plugins: [new TsconfigPathsPlugin({
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
      })],
    },
  }
}
