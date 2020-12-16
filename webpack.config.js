const path = require('path') // указывает абсолютные пути для файлов
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключение плагина для разпознания последнего js файла
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключение плагина для удаления лишних js файлов при изминении в папке dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), 
    mode: "development",
    entry : {
        main: './js/index.js', // принимает файл
        news: './js/news.js' // новое подключение
    },
    output : {
        filename : '[contenthash].[name].js', // имя файла куда отправлят (создание нововго файла) 
        path: path.resolve(__dirname, 'dist') // имя папки куда будет отправлять (создание новой папки)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./index.html' // подключение шаблона 
        }),
        new CleanWebpackPlugin (), // очистка лишних js файлов
        new MiniCssExtractPlugin ({
            filename: "[name].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                    ] 
            },
            {
                test: /\.css$/, 
                use: 
                [
                MiniCssExtractPlugin.loader, 
                'css-loader'
                ] 
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css',],
        alias: {
            main: path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      }
}