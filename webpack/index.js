#!/usr/bin/env node
const createVariants = require('parallel-webpack').createVariants;
const webpackClient = require('./webpack.client.config');
const webpackServer = require('./webpack.server.config');

const buildVariants = {
    render: ['CSR', 'SSR'],
    capability: ['modern', 'legacy'],
    platform: ['default', 'ios', 'android'],
};

const createConfig = options => {
    if (options.render === 'CSR') {
        return webpackClient(options);
    } else {
        return webpackServer(options);
    }
};

module.exports = createVariants({}, buildVariants, createConfig);
