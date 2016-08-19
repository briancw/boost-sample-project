module.exports = function(app) {
    if (process.argv[2] === 'dev') {
        const httpProxy = require('http-proxy');
        const proxy = httpProxy.createProxyServer({
            changeOrigin: true,
        });
        const build_port = process.env.BUILD_PORT;

        app.all('/build/*', function(req, res) {
            proxy.web(req, res, {
                target: 'http://localhost:' + build_port,
            });
        });

        proxy.on('error', function(e) {
            console.log(e);
            console.log('Could not connect to proxy, please try again...');
        });
    }
};
