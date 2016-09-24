module.exports = {
    // ssl: false,
    // key: './server.key',
    // cert: './server.crt',
    spdy: {
        protocols: ['http/1.1'],
        plain: true,
    },
    adapter: 'rethink',
    cache: {
        type: 'redis',
        limit: 10,
    },
    jwt: {
        // a week in ms
        lifetime: 86400000,
    },
};
