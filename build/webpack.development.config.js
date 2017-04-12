const webpack = require('webpack');
const merge   = require('webpack-merge');
const utils   = require('./utils');
const base    = require('./webpack.base.config');

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
    proxy:
        '/api/*': {
            target: {
                host    : 'localhost',
                port    : 3000,
                protocol: 'https:',
                key     : fs.readFileSync('../ssl/manager-key.pem', 'utf8'),
                cert    : fs.readFileSync('../ssl/manager-crt.pem', 'utf8')
            },
            changeOrigin: true,
            secure      : false,
            pathRewrite : {
                '/api/login': '/services/login',
                '^/api'     : '/services/manager'
            },
            logLevel: 'warn'
        }
    }
});
