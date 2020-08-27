var student_info = require('./student');
var general = require('./general');
var master_info = require('./master');
var courses_info = require('./Mastercourses');
var course_students_info = require('./courseStudents');
var students_courses_info = require('./studentCourses');
var students_sessions_info = require('./studentSessions');
var num_of_requests = require('./NumOfRequests');

module.exports = [].concat(student_info, general, master_info, courses_info, course_students_info,
      students_courses_info, students_sessions_info, num_of_requests);