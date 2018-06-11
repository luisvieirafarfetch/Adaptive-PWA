const cwd = process.cwd();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackClient = options => {
    const { capability, platform } = options;

    return {
        context: cwd,
        entry: [`${cwd}/src/client/entry-client.js`],
        output: {
            path: `${cwd}/build`,
            filename: `${platform}.${capability}.client.js`,
            publicPath: '',
        },

        resolve: {
            extensions: [`.${platform}.js`, '.js'],
        },

        devtool: 'cheap-module-source-map',

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
                    test: /(\.js$|\.ts(x?)$)/,
                    include: [path.join(cwd, 'src')],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [
                                    [
                                        'env',
                                        {
                                            targets: {
                                                browsers:
                                                    capability === 'modern'
                                                        ? [
                                                              'last 2 Chrome versions',
                                                              'not Chrome < 60',
                                                              'last 2 Safari versions',
                                                              'not Safari < 10.1',
                                                              'last 2 iOS versions',
                                                              'not iOS < 10.3',
                                                              'last 2 Firefox versions',
                                                              'not Firefox < 54',
                                                              'last 2 Edge versions',
                                                              'not Edge < 15',
                                                          ]
                                                        : [
                                                              '> 1%',
                                                              'last 2 versions',
                                                              'Firefox ESR',
                                                          ],
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
                filename: `${platform}.${capability}.client.css`,
                allChunks: true,
            }),

            new webpack.DefinePlugin({
                __CLIENT__: true,
                __SERVER__: false,
            }),
        ],
    };
};

module.exports = webpackClient;
