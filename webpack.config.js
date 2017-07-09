var webpack = require('webpack');
var path = require("path");
module.exports = {
  entry: {
    app: ["./client/app/main.ts"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.scss$/,
        loaders: ['raw', 'sass?sourceMap'] // sass-loader not scss-loader
      },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};