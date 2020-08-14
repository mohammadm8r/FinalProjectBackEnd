'use strict';
// import * as myRoutes from './routes.js'
const Hapi = require('@hapi/hapi');
const Path = require('path');
const routes = require('./config/routes');


const init = async () => {

    const server = Hapi.server({
        port: 3030,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            },
            cors: true
        }
    });

    await server.register(require('@hapi/inert'));
    server.route(routes)
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();