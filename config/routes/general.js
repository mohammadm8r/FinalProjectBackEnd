
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    },
    {
        method: 'GET',
        path: '/classSessionsPhotos',
        handler: (request, h) => {
            const payload = request.query
            console.log('ClassSessions/'+ payload.course_title + '/' + payload.course_group + '/' + payload.session_id + '/photo.jpg')
            let res = h.file('ClassSessions/'+ payload.course_title + '/' + payload.course_group + '/' + payload.session_id + '/photo.jpg')
            return res;
        }
    },
    {
        method: 'GET',
        path: '/StudentsPhotos',
        handler: (request, h) => {
            const payload = request.query
            console.log('ClassSessions/'+ payload.course_title + '/' + payload.course_group + '/' + payload.session_id + '/9431040.jpg')
            let res = h.file('ClassSessions/'+ payload.course_title + '/' + payload.course_group + '/' + payload.session_id + '/9431040.jpg')
            return res;
        }
    },
];