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

    request_student_attendance_info: async function (client, name, family) {
        const query = {
            text: 'select * from attendance inner join class_sessions on attendance.session_id = class_sessions.id inner join register on class_sessions.cp_id = register.cp_id inner join student on register.student_id = student.student_id where student_name = $1 and student_family = $2',
            values: [name, family],
        }
        try {
            const res = await client.query(query)
            // console.log(res.rows)
            for(var i = 0; i < res.rows.length; i++){
                console.log(res.rows[i])
            }
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
            console.log(res.rows)
            return res.rows;
        } catch (err) {
            console.log(err.stack)
            return 'user not found';
        }
    },
}
