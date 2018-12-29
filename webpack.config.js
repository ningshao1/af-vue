const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const plugins = [new HtmlWebpackPlugin({ template: './index.html' })];
module.exports = {
    mode: "none",
    entry: "./src/vue.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'G-vue.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    // devtool: 'inline-source-map',
    devServer: {

    },
    plugins: [
        ...plugins
    ]
}