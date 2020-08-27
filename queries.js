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
                text: "select * from course_presentation inner join class_sessions on class_sessions.cp_id = course_presentation.id inner join register on register.cp_id = course_presentation.id inner join student on student.student_id = register.student_id inner join course on course_presentation.course_id = course.course_id left join attendance on attendance.session_id = class_sessions.id and attendance.student_id = student.student_id where student_username = $1 and course_title = $2 and course_group = $3 order by class_sessions.id",
                values: [username, class_title, class_group],
            }
        }
        else {
            query = {
                text: "select * from course_presentation inner join class_sessions on class_sessions.cp_id = course_presentation.id inner join register on register.cp_id = course_presentation.id inner join student on student.student_id = register.student_id inner join course on course_presentation.course_id = course.course_id left join attendance on attendance.session_id = class_sessions.id and attendance.student_id = student.student_id where CONCAT(student.student_name, ' ', student.student_family) LIKE $1 and course_title = $2 and course_group = $3 order by class_sessions.id",
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
            text: "select COUNT(*) from request inner join attendance on request.attendance_id = attendance.id inner join student on student.student_id = attendance.student_id where student.student_id = $1",
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

}
