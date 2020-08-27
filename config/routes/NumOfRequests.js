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
    }
];
