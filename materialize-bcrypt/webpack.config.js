const { resolve, join }         = require('path');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');

const publicPath = process.env.NODE_ENV === 'gh-pages' ? '/js-examples/' : '/';
const isDevMode = () => process.env.NODE_ENV === 'development';

process.env.NODE_ENV = isDevMode() ? 'development' : 'production';

module.exports = {
  entry: './app/main.js',
  output: {
    publicPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [
      `${__dirname}/node_modules`,
    ],
  },
  mode: process.env.NODE_ENV || 'production',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: '[name].css',
      // chunkFilename: '[id].css'
      filename: isDevMode() ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevMode() ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'app', 'index.html'),
      favicon: resolve(__dirname, 'app', 'favicon.ico'),
      minify: isDevMode() ? false : {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new BaseHrefWebpackPlugin({
      baseHref: publicPath,
    }),
  ],
  module: {
    rules: [
      // fonts
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 5000,
            // url-loader sets mimetype if it's passed.
            // Without this it derives it from the file extension
            mimetype: 'application/font-woff',
            // Output below fonts directory
            name: 'fonts/[name].[ext]',
          },
        },
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'material-icons'),
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: 'fonts/[name].[ext]',
          },
        },
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'material-icons'),
        ],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: 'fonts/[name].[ext]',
          },
        },
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'material-icons'),
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'material-icons'),
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'material-icons'),
        ],
      },/*
      // styles (css)
      {
        test: /\.css$/i,
        use: [
          isDevMode(publicPath) ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'materialize-css'),
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'app'),
        ],
      },*/
      // styles (css / scss)
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDevMode() ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        include: [
          join(__dirname, 'node_modules', 'material-design-icons'),
          join(__dirname, 'node_modules', 'materialize-css'),
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'app'),
        ],
      },
    ],
  },
  // production:
  optimization: {
    // lazy import
    splitChunks: {
      chunks: 'all',
    },
    // minification:
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({ /* TODO */ }),
    ],
  },
  node: {
    fs: 'empty',
    'child_process': 'empty',
    // console: false,
    // net: 'empty',
    // tls: 'empty',
  },
};
