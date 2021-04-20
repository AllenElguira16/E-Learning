const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 *
 * @param {require('express').Application} app
 */
module.exports = function(app) {
    app.use(
        '/rest',
        createProxyMiddleware({
            target: 'http://localhost:8083',
            changeOrigin: true,
            pathRewrite: {
                '/rest/static': '/static',
                '/rest': '/rest'
            }
        }),
    );

    // app.use(
    //     '/rest/static',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8083',
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '/static': '/rest/static'
    //         }
    //     }),
    // );
};
