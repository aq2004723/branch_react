'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src');

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        login:path.join(srcPath,'js/login.jsx'),
        admin:path.join(srcPath,'js/admin.jsx'),
        instructor:path.join(srcPath,'js/instructor.jsx'),
        student:path.join(srcPath,'js/student.jsx')
    },
    resolve: {
        root: [srcPath,__dirname],
        extensions: ['', '.js','.jsx'],
        modulesDirectories: ['node_modules']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
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
            filename:'../template/admin.html',
            template: 'src/admin.html'
        }),
        new HtmlWebpackPlugin({
            filename:'../template/login.html',
            template: 'src/login.html'
        }),
        new HtmlWebpackPlugin({
            filename:'../template/student.html',
            template: 'src/student.html'
        }),
        new HtmlWebpackPlugin({
            filename:'../template/instructor.html',
            template: 'src/instructor.html'
        }),
        new webpack.NoErrorsPlugin()
    ]
};