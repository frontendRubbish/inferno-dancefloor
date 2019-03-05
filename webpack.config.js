const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
                {
                  loader: prod ? MiniCssExtractPlugin.loader : "style-loader"
                },
                {
                  loader: "css-loader",
                  options: {
                    url: false
                  }
                },
                {
                  loader: "sass-loader" // compiles Sass to CSS
                }
            ]
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              options: {
                  presets: ['@babel/preset-env'],
                  plugins: [['babel-plugin-inferno', {'imports': true}]]
              }
          }
        ]
    },
    devServer: {
  		contentBase: './',
      hot: true,
  		port: 8080
  	},
    mode,
  	plugins: [
  		new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
  			filename: '[name].css'
  		})
  	]
}
