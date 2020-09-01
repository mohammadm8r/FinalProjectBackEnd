const { isUndefined } = require('util');

var db = require('../../queries');

module.exports = [
    {
        method: 'POST',
        path: '/updateAttendance/change',
        handler: (request, h) => {
            const payload = request.payload;
            let res = db.change_attendance_status(db.client, payload.attendance_id, payload.attendance_new_status);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },

    {
        method: 'POST',
        path: '/updateRequest/change',
        handler: (request, h) => {
            const payload = request.payload;
            let res = db.change_request_status(db.client, payload.attendance_id, payload.attendance_new_status, payload.request_status);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },
];