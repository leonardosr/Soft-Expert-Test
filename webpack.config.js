var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {

        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?' + JSON.stringify({
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'react-hmre']
            })],
                include: [path.resolve(__dirname, 'src', 'js')],
            },
            {
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'css')]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'testOptions': {
                'filter' : false
            }
        })
    ]
};
