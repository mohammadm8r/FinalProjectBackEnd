
module.exports = [
    {method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello World!';
    }},
    {method: 'GET',
    path: '/student/pic/{std_id}',
    handler: (request, h) => {
        return h.file('student/picture/' + request.params.std_id + '.jpg');
    }},
];