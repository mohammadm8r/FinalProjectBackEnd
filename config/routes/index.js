var student_info = require('./student');
var general = require('./general');
var master_info = require('./master');
var courses_info = require('./Mastercourses');
var course_students_info = require('./courseStudents');
var students_attendance_info = require('./studentAttendance');
var students_courses_info = require('./studentCourses');

module.exports = [].concat(student_info, general, master_info, courses_info, course_students_info, students_attendance_info, students_courses_info);