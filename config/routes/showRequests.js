const { isUndefined } = require('util');

var db = require('../../queries');

module.exports = [
    {
        method: 'POST',
        path: '/showRequests',
        handler: (request, h) => {
            const payload = request.payload;
            let res = db.showRequests(db.client, payload.attendance_id);
            if (isUndefined(res)) {
                return `user not found`
            } else {
                return res;
            }
        }
    }
];
