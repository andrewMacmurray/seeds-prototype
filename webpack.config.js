const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  publicPath: './public/',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'react-hot-loader!babel-loader'
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
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  }
}
