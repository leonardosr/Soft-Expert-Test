var path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            /*{
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }*/
            {
                loader: 'style!css',
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'css')]
            }
        ]
    }
};
