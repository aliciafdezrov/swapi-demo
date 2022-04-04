const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path");
const helpers = require('./helpers');

module.exports = {
    context: helpers.resolveFromRootPath('src'),
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            common: helpers.resolveFromRootPath('src/common'),
            core: helpers.resolveFromRootPath('src/core'),
            layouts: helpers.resolveFromRootPath('src/layouts'),
            pods: helpers.resolveFromRootPath('src/pods'),
            scenes: helpers.resolveFromRootPath('src/scenes'),

        },
    },
    entry: {
        app: ['regenerator-runtime/runtime', './index.tsx'],
        styles: './index.scss',
    },
    output: {
        path: path.resolve(process.cwd(), "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            scriptLoading: "defer",
        }),
        new CleanWebpackPlugin(),
    ],
};
