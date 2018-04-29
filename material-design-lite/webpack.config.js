const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const publicPath = process.env.NODE_ENV === 'gh-pages' ? '/js-examples/' : '/';
// const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

process.env.NODE_ENV = publicPath.startsWith('dev') ? 'development' : 'production';

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
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'app', 'index.html'),
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
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-icons'),
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
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-icons'),
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
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-icons'),
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
        include: [
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-icons'),
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
        include: [
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-icons'),
        ],
      },
      // styles
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        include: [
          join(__dirname, 'node_modules', 'toastr'),
          join(__dirname, 'node_modules', 'material-icons'),
          join(__dirname, 'node_modules', 'material-design-lite'),
          join(__dirname, 'node_modules', 'material-design-icons'),
        ],
      },
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
