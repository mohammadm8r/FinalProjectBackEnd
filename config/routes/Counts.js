const { isUndefined } = require('util');

var db = require('../../queries');

module.exports = [
    {
        method: 'POST',
        path: '/requestsCount',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.num_of_requests(db.client, payload.student_id);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },
    {
        method: 'POST',
        path: '/requestsUnreadCount',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.num_of_requests_unread(db.client, payload.student_id);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },
    {
        method: 'POST',
        path: '/classSessionsNum',
        handler: (request, h) => {
            const payload = request.payload;
            let res = db.num_of_class_sessions(db.client, payload.cp_id);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },
    {
        method: 'POST',
        path: '/absensesNum',
        handler: (request, h) => {
            const payload = request.payload;
            let res = db.num_of_absense(db.client, payload.student_id);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    },
];
