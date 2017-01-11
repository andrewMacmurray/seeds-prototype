const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  publicPath: './public/',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'react-hot-loader/webpack!babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'svg-url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
}
