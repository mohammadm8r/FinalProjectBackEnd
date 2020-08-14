var myQueries = require('./queries')

module.exports = [
    {method: 'POST',
    path: '/student/info',
    handler: (request, h) => {
        const payload = request.payload;
        // console.log(payload);
        // console.log(request_student_info(payload.username));
        let res = myQueries.request_student_info(payload.username);
        if (isUndefined(res)) {
            return `user not found`
        } else {
            return res;
        }
    }}
];