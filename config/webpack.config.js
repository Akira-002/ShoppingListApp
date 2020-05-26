const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './client/public/index.html',
  filename: './index.html'
});

module.exports = {
  entry: './client/js/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // preset: [['@babel/preset-env', { mode: false}]]
              // .babelrcに記述
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../client/scss'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, '../client/images'),
        loader: 'url-loader',
        options: {
          //画像ファイルサイズが 8 KB (8 * 1024 = 8192)以上だったらDataURLに変換せずに出力
          limit: 8192,
          //出力するDataURLに変換しなかった画像の名前
          //[name].[ext]は[バンドル前のファイル名].[バンドル前のファイルの拡張子]
          name: '[name].[ext]',
          //DataURLに変換しなかった画像の出力先
          //defaultではoutput.pathに指定したパス(今回はpublic/js)に出力される
          //今回はpublic/imagesに出力させたいため、public/jsからの相対パスを指定する
          outputPath: '../dist/images',
          //出力されるファイルからの画像の読み込み先
          //今回はdist/index.htmlからdist/imagesの画像を読み込ませたい
          publicPath: path => './images/' + path
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};