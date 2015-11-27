'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src');

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        app:path.join(srcPath, 'js/app.jsx')
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js','.jsx'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: ['Example', '[name]'],
        pathInfo: true
    },

    module: {
        loaders: [
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.NoErrorsPlugin()
    ]
};