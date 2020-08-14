var student_info = require('./student');
var general = require('./general');
var master_info = require('./master');

module.exports = [].concat(student_info, general, master_info);