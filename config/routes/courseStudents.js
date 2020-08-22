const { isUndefined } = require('util');

var db = require('../../queries')

module.exports = [
    {
        method: 'POST',
        path: '/courseStudents/info',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.request_course_students_info(db.client, payload.course_title, payload.course_group);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];