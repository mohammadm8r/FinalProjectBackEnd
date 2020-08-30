const { isUndefined } = require('util');

var db = require('../../queries');

module.exports = [
    {
        method: 'POST',
        path: '/insertRequest',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.insert_request(db.client, payload.attendance_id, payload.request_type, payload.request_comment);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];
