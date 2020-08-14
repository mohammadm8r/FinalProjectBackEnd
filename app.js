'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const { Client } = require('pg');
const { stringify } = require('querystring');
const { isUndefined } = require('util');

async function request_student_info(username) {
    const client = new Client({
        user: 'Mohammad',
        host: '127.0.0.1',
        database: 'Attendance',
        port: 5432,
        password: '123'
    });

    client.connect(err => {
        if (err) {
            console.error('DB connection error', err.stack)
        } else {
            console.log('connected to DB')
        }
    })

    const query = {
        text: 'SELECT * FROM student WHERE student_username = $1',
        values: [username],
    }

    try {
        const res = await client.query(query)
        console.log(res.rows[0])
        return res.rows[0];
    } catch (err) {
        console.log(err.stack)
        return 'user not found';
    }
}


const init = async () => {

    const server = Hapi.server({
        port: 3030,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/student/pic/{std_id}',
        handler: (request, h) => {
            return h.file('student/picture/' + request.params.std_id + '.jpg');
        }
    });

    server.route({
        method: 'POST',
        path: '/student/info',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = request_student_info(payload.username);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }

        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();