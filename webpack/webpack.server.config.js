const cwd = process.cwd();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackServer = options => {
    const { capability, platform } = options;

    return {
        context: cwd,
        entry: `${cwd}/src/client/entry-server.js`,

        target: 'node',

        output: {
            path: `${cwd}/build`,
            filename: `${platform}.${capability}.server.js`,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: 'render',
        },

        resolve: {
            extensions: ['ios.js', '.js'],
        },

        devtool: false,

        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: [path.join(cwd, 'src')],
                    loader: ExtractTextPlugin.extract({
                        fallback: {
                            loader: require.resolve('style-loader'),
                        },

                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    sourceMap: false,
                                    modules: true,
                                    localIdentName: '[hash:6]',
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    plugins: [
                                        require('postcss-custom-properties')({
                                            preserve:
                                                capability === 'modern'
                                                    ? true
                                                    : false,
                                        }),
                                    ],
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.js$/,
                    include: [path.join(cwd, 'src')],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [
                                    [
                                        'babel-preset-env',
                                        {
                                            targets: {
                                                node: '8.0',
                                            },
                                        },
                                    ],
                                ],
                                plugins: ['transform-react-jsx'],
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin({
                filename: `${platform}.${capability}.server.css`,
                allChunks: true,
            }),
            new webpack.DefinePlugin({
                __CLIENT__: false,
                __SERVER__: true,
            }),
        ],
    };
};

module.exports = webpackServer;
