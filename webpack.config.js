var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["./app/src/config.js", "./app/src/config/main.scss"],
    output: {
        path: __dirname + "/app/build",
        filename: "app-main-dist.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
            { test: /node_modules[\\\/]admin-config[\\\/].*\.jsx?$/, loader: 'babel' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
};
