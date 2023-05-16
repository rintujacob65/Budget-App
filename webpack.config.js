const path = require('path');
 
module.exports = {
  entry: './src/app.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{      
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
              '@babel/preset-env',
              '@babel/preset-react'
          ]
      },
      }
    }, {
      test:/\.s?css$/,
      use:[
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'public')
  }
};


