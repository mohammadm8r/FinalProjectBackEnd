var student_info = require('./student');
var general = require('./general');
var master_info = require('./master');
var courses_info = require('./courses');
var course_students_info = require('./courseStudents');

module.exports = [].concat(student_info, general, master_info, courses_info, course_students_info);