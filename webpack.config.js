const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    // 'react-hot-loader/patch', // for hot module reload
    // 'webpack-dev-server/client?http://localhost:8080', // for hot module reload
    // 'webpack/hot/only-dev-server', // for hot module reload
    'webpack-hot-middleware/client?path=__webpack_hmr&timeout=2000', // to fix hot module reload after introducing server-side rendering
    './js/ClientApp.jsx'
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true // Telling dev server if it doesn't recognise something send it down to the client, and let the client worry about the routing. 404s will fall back to /index.html
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // order of resolutions.
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/, // anything that ends in js or jsx run through babel
        loader: 'babel-loader'
      }
    ]
  }
};
