const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    devServer: {
        open: true
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                    url: true,
                    import: true
                }
            },
            {
                test: /\.(jpg|png)$/i,
                type:'asset/resource'
            },
            {
                test: /\.svg$/i,
                loader: "svg-inline-loader"
            }
        ]
    }
}