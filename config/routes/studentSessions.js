const { isUndefined } = require('util');

var db = require('../../queries')

module.exports = [
    {
        method: 'POST',
        path: '/studentSessions',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.request_student_sessions_info(db.client, payload.username, payload.course_title, payload.course_group);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];