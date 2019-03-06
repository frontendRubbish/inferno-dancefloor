const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  entry: './src/index.js',
  output: {
      path: __dirname + '/public',
      filename: '[name].js'
  },
  module: {
      rules: [
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

module.exports = (env, argv) => {
    config.module.rules.push(
        {
          test: /\.scss$/,
          use: [
            {
              loader: ( argv.mode === 'production' ) ? MiniCssExtractPlugin.loader : "style-loader"
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
        }
    );

    return config;
}
