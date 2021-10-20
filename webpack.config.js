const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',


    },
    experiments: {
        asset: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "pug/pages/index.pug")
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/images')
                }
            ]
        })
    ],
    module: {
        rules:
            [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    exclude: '/node-modules'
                },
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader',
                        
                    },
                    exclude: '/node-modules'
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [

                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|svg|jpeg|gif)$/,
                    use: ['file-loader'],
                    type: 'asset/resource'


                }
            ]
    }

}
