const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = { // это синтаксис экспорта в Node.js
  entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),/* { main: './pages/index.js' }, */ // указали первое место, куда заглянет webpack
  output: { // указали в какой файл будет собираться весь js и дали ему имя 
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: '[name].[contenthash].js',
    clean: true,
    // publicPath: ''
  },
  devtool: 'inline-source-map', // связь с исходником для остлеживания ошибок
  // mode: 'development', // добавили режим разработчика
  // devServer: {
  //   static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
  //   compress: true, // это ускорит загрузку в режиме разработки
  //   port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
  //   open: true // сайт будет открываться сам при запуске npm run dev
  // },
  module: {
    rules: [ // это массив правил, добавим в него объект правил для бабеля
      {
        test: /\.m?js$/, // регулярное выражение, которое ищет все js файлы
        exclude: /node_modules/, // исключает папку node_modules, файлы в ней обрабатывать не нужно
        use: {
          loader: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }, // добавили правило для обработки файлов
      {
        test: /\.(jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        },
      }, // регулярное выражение, которое ищет все файлы с такими расширениями
      {
        test: /\.(png|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/logo/[name].[hash][ext]'
        },
      }, // регулярное выражение, которое ищет все файлы с такими расширениями
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'vendor/font/[name].[hash][ext]'
        },
      }, // регулярное выражение, которое ищет все файлы с такими расширениями
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader', // Добавьте postcss-loader
          },
        ],
      },
    ],
  },
  plugins: [ // добавьте массив
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};