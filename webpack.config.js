const HTMLWebPackPlugin = require('html-webpack-plugin');

const HTMLWebPackPluginConfig = new HTMLWebPackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: __dirname + '/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build',
    publicPath: '/',
  },
  plugins: [HTMLWebPackPluginConfig],
};
