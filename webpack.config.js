const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const config = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Task planner",
            template: path.resolve(__dirname, "index.html"),
            filename: "index.html", //
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
};

module.exports = config;
