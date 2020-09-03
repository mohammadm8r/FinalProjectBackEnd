const { Client } = require('pg');

function connect_to_db() {
    const client = new Client({
        user: 'Mohammad',
        host: '127.0.0.1',
        database: 'Attendance',
        port: 5432,
        password: '123'
    });
    client.connect(err => {
        if (err) {
            console.error('DB connection error', err.stack)
        } else {
            console.log('connected to DB')
        }
    })
    return client;
}

module.exports = {
    client: connect_to_db(),
    
    request_student_info: async function (client, username) {
        const query = {
            text: 'SELECT * FROM student WHERE student_username = $1',
            values: [username],
        }

        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }

    },

    request_master_info: async function (client, username) {
        const query = {
            text: 'SELECT * FROM master WHERE master_username = $1',
            values: [username],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    request_master_courses_info: async function (client, username) {
        const query = {
            text: 'select * from course_presentation inner join master on course_presentation.master_id = master.master_id inner join course on course.course_id = course_presentation.course_id where master.master_username = $1 ',
            values: [username],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows)
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    request_course_students_info: async function (client, course_title, course_group) {
        const query = {
            text: 'select * from register  inner join course_presentation on course_presentation.id = register.cp_id inner join student on student.student_id = register.student_id inner join course on course.course_id = course_presentation.course_id where course.course_title = $1 and course_presentation.course_group = $2',
            values: [course_title, course_group],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows)
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },


    request_student_courses_info: async function (client, username) {
        const query = {
            text: 'select * from student inner join register on register.student_id = student.student_id inner join course_presentation on course_presentation.id = register.cp_id inner join course on course_presentation.course_id = course.course_id where student.student_username = $1',
            values: [username],
        }
        try {
            const res = await client.query(query)
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    request_student_sessions_info: async function (client, username, class_title, class_group) {
        var query = {};
        if (username.includes('@')){
            query = {
                text: "select class_sessions.id as session_id, session_date, start_time, end_time, attendance.id as attendance_id, attendance_status from course_presentation inner join class_sessions on class_sessions.cp_id = course_presentation.id inner join register on register.cp_id = course_presentation.id inner join student on student.student_id = register.student_id inner join course on course_presentation.course_id = course.course_id left join attendance on attendance.session_id = class_sessions.id and attendance.student_id = student.student_id where student_username = $1 and course_title = $2 and course_group = $3 order by class_sessions.id",
                values: [username, class_title, class_group],
            }
        }
        else {
            query = {
                text: "select class_sessions.id as session_id, session_date, start_time, end_time, attendance.id as attendance_id, attendance_status from course_presentation inner join class_sessions on class_sessions.cp_id = course_presentation.id inner join register on register.cp_id = course_presentation.id inner join student on student.student_id = register.student_id inner join course on course_presentation.course_id = course.course_id left join attendance on attendance.session_id = class_sessions.id and attendance.student_id = student.student_id where CONCAT(student.student_name, ' ', student.student_family) LIKE $1 and course_title = $2 and course_group = $3 order by class_sessions.id",
                values: [username, class_title, class_group],
            }
        }
        
        try {
            const res = await client.query(query);
            for (var i = 0; i < res.rows.length; i++){
                switch(res.rows[i].attendance_status){
                    case 1:
                        res.rows[i].attendance_matn = 'حاضر';
                        break;
                    case 2:
                    res.rows[i].attendance_matn = 'حاضر';
                    break;
                    case 3:
                        res.rows[i].attendance_matn = 'حاضر';
                        break;
                    case 4:
                        res.rows[i].attendance_matn = 'غایب';
                        break;
                    case 5:
                    res.rows[i].attendance_matn = 'غایب';
                    break;
                    case 6:
                        res.rows[i].attendance_matn = 'غایب';
                        break;
                    case null:
                        res.rows[i].attendance_matn = 'موجود نیست';
                        break;
                    default:
                        res.rows[i].attendance_matn = 'موجود نیست';
                }
            }
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    num_of_requests: async function (client, studentID) {
        const query = {
            text: "select COUNT(*) from requests inner join attendance on requests.attendance_id = attendance.id where attendance.student_id = $1",
            values: [studentID],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    num_of_requests_unread: async function (client, studentID) {
        const query = {
            text: "select COUNT(*) from requests inner join attendance on requests.attendance_id = attendance.id where attendance.student_id = $1 and requests.request_status = 0",
            values: [studentID],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    num_of_absense: async function (client, studentID) {
        const query = {
            text: "select COUNT(*) from attendance where student_id = $1 and attendance_status = 4 or attendance_status = 5 or attendance_status = 6",
            values: [studentID],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    num_of_class_sessions: async function (client, cp_id) {
        const query = {
            text: "select COUNT(*) from class_sessions where cp_id = $1",
            values: [cp_id],
        }
        try {
            const res = await client.query(query)
            console.log(res.rows[0])
            return res.rows[0];
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    insert_request: async function (client, attendance_id, request_type, request_comment) {
        const query = {
            text: "insert into requests(attendance_id, request_type, request_comment, request_date, request_time) values($1, $2, $3, current_date, current_time)",
            values: [attendance_id, request_type, request_comment],
        }
        try {
            const res = await client.query(query)
            return 'ok';
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    showRequests: async function (client, attendance_id) {
        const query = {
            text: "select * from requests where attendance_id = $1",
            values: [attendance_id],
        }
        try {
            const res = await client.query(query)
            for (var i = 0; i < res.rows.length; i++){
                switch(res.rows[i].request_type){
                    case 1:
                        res.rows[i].request_type_matn = 'درخواست ثبت حضور';
                        break;
                    case 2:
                    res.rows[i].request_type_matn = 'درخواست ثبت غیبت';
                    break;
                    default:
                        res.rows[i].request_type_matn = 'موجود نیست';
                }
            }
            for (var j = 0; j < res.rows.length; j++){
                switch(res.rows[j].request_status){
                    case 0:
                        res.rows[j].request_status_matn = 'پاسخ داده نشده';
                        break;
                    case 1:
                    res.rows[j].request_status_matn = 'تائید شده';
                    break;
                    case 2:
                    res.rows[j].request_status_matn = 'رد شده';
                    break;
                    default:
                        res.rows[j].request_status_matn = 'موجود نیست';
                }
            }
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    change_attendance_status: async function (client, attendance_id, attendance_new_status) {
        const query = {
            text: "UPDATE attendance SET attendance_status = $1 WHERE id = $2",
            values: [attendance_new_status, attendance_id],
        }
        try {
            console.log({attendance_id, attendance_new_status})
            const res = await client.query(query)
            return {status: 'ok'};
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },

    change_request_status: async function (client, attendance_id, attendance_new_status, request_status) {
        const query = {
            text: "UPDATE attendance SET attendance_status = $1 WHERE id = $2",
            values: [attendance_new_status, attendance_id],
        }
        const query2 = {
            text: "UPDATE requests SET request_status = $2, request_date = CURRENT_DATE, request_time = CURRENT_TIME WHERE attendance_id = $1",
            values: [attendance_id, request_status],
        }
        try {
            console.log({attendance_id, attendance_new_status, request_status})
            const res = await client.query(query)
            const res2 = await client.query(query2)
            return {status: 'ok'};
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },
    
}
