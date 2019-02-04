const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env, argv) => {
    let dev = argv.mode === "development"
    let cssLoaders = [
        dev ? 'style-loader' : MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
    ]
    if(!dev)
    {
        cssLoaders.push({
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie' > 8]
                    })
                ],
            }
        })
    }
    return {
        entry: {
          app: './src/index.js'
        },
        watch: dev,
        devtool: dev ? "cheap-module-eval-source-map" : false,
        output: {
            path: path.resolve('./dist'), // Path of result files
            filename: '[name].js',
            publicPath: "dist"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader', // Use last ES syntax
                    }
                },
                {
                    test: /\.css$/,
                    use: cssLoaders,
                },
                {
                    test: /\.scss$/,
                    use: [...cssLoaders, 'sass-loader'],
                },
            ]
        }
    }
}