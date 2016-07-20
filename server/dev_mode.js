module.exports = function(app) {
    if (process.argv[2] === 'dev') {
        const httpProxy = require('http-proxy');
        const proxy = httpProxy.createProxyServer({
            changeOrigin: true,
        });

        app.all('/build/*', function(req, res) {
            proxy.web(req, res, {
                target: 'http://localhost:8090',
            });
        });

        proxy.on('error', function(e) {
            console.log(e);
            console.log('Could not connect to proxy, please try again...');
        });
    }
};
