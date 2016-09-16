module.exports = {
    // ssl: false,
    // key: './server.key',
    // cert: './server.crt',
    spdy: {
        protocols: ['http/1.1'],
        plain: true,
    },
    cache: {
        type: 'redis',
        limit: 10,
    }
};
