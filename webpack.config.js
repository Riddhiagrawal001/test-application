const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require("tailwindcss");

module.exports = {
    entry: './src/App.js', // Entry file
    output: {
        path: path.resolve(__dirname, 'dist'), // Output folder
        filename: 'index.js', // Output file
        library: 'MyReactLibrary', // Global variable name for UMD (Universal Module Definition)
        libraryTarget: 'umd', // Support for multiple module formats
        umdNamedDefine: true, // Enable UMD define naming
        globalObject: 'this', // For proper handling in the browser environment
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match JS and JSX files
                exclude: /node_modules/, // Don't transpile node_modules
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

            },

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [[tailwindcss("./tailwind.config.js")]],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve JS and JSX extensions
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Use your existing HTML template
        }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
};
