const fs      = require('fs');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const utils   = require('./utils');
const base    = require('./webpack.base.config');

const isHttps = fs.existsSync('../ssl/manager-key.pem') &&
    (process.env.SERVER_PROTOCOL === 'https' || !process.env.SERVER_PROTOCOL)

const proxy = fs.existsSync('../ssl/manager-key.pem') ? {
    '/api/*': {
        target: {
            host    : 'server',
            port    : 3000,
            protocol: isHttps ? 'https:' : 'http:',
            key     : isHttps && fs.readFileSync('../ssl/manager-key.pem', 'utf8'),
            cert    : isHttps && fs.readFileSync('../ssl/manager-crt.pem', 'utf8')
        },
        changeOrigin: true,
        secure      : false,
        pathRewrite : {
            '/api/login': '/services/login',
            '^/api'     : '/services/manager'
        },
        logLevel: 'warn'
    }
} : {};

module.exports = merge(base, {
    module: {
        rules: utils.styleLoaders()
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"development"' },
            'config': require('../config')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        proxy
    }
});
