const { isUndefined } = require('util');

var db = require('../../queries')

module.exports = [
    {
        method: 'POST',
        path: '/studentCourses',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.request_student_courses_info(db.client, payload.username);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];