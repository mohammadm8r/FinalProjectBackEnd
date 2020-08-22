const { isUndefined } = require('util');

var db = require('../../queries');

module.exports = [
    {
        method: 'POST',
        path: '/student/attendance/info',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.request_student_attendance_info(db.client, payload.name, payload.family);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];
