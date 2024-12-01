const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacherSchedule/scheduleTeacher.controller');

// Assign teacher to schedules
router.post('/assign', controller.assignTeacher);

// Get schedules for a teacher
router.get('/:teacherId', controller.getTeacherSchedules);

module.exports = router;
