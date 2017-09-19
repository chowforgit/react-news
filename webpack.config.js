var webpack = require('webpack');
var path = require('path');


module.exports = {
    context: path.join(__dirname),
    entry: "./src/js/root.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/src/"
    },

    module: {
        loaders: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: __dirname,
                query: {
                    presets: ["es2015", "react"],
                    plugins: ['react-html-attrs']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
}