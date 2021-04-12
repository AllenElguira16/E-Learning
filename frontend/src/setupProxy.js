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
            changeOrigin: true
        })
    );
};
