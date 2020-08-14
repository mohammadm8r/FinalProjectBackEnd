const { isUndefined } = require('util');

var db = require('../../queries')

module.exports = [
    {
        method: 'POST',
        path: '/master/info',
        handler: (request, h) => {
            const payload = request.payload;
            // console.log(payload);
            // console.log(request_student_info(payload.username));
            let res = db.request_master_info(db.client, payload.username);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];