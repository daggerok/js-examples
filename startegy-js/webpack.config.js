const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const publicPath = process.env.NODE_ENV === 'gh-pages' ? '/js-examples/' : '/';

process.env.NODE_ENV = publicPath.startsWith('dev') ? 'development' : 'production';

module.exports = {
  entry: `./app/main.js`,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath,
  },
  resolve: {
    modules: [
      `${__dirname}/node_modules`,
    ],
  },
  mode: process.env.NODE_ENV || 'production',
  plugins: [
    new HtmlWebpackPlugin(),
    new BaseHrefWebpackPlugin({
      baseHref: publicPath,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        include: join(__dirname, 'node_modules', 'toastr'),
      },
    ],
  },
  node: {
    fs: 'empty',
    'child_process': 'empty',
    // console: false,
    // net: 'empty',
    // tls: 'empty',
  }
};
