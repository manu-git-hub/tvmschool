const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacherSchedule/scheduleTeacher.controller');

// Assign teacher to schedules
router.post('/assign', controller.assignTeacher);

// Get schedules for a teacher
router.get('/:teacherId', controller.getTeacherSchedules);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "schedules": [
//       {
//         "standardId": 1,
//         "subjectId": 2,
//         "divisionId": 3
//       },
//       {
//         "standardId": 4,
//         "subjectId": 5,
//         "divisionId": 6
//       }
//     ]
//   }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "standardId": 1,
//       "subjectId": 2,
//       "divisionId": 3,
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z",
//       "standard": {
//         "name": "Class I"
//       },
//       "subject": {
//         "name": "Mathematics"
//       },
//       "division": {
//         "name": "A"
//       }
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "standardId": 4,
//       "subjectId": 5,
//       "divisionId": 6,
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z",
//       "standard": {
//         "name": "Class IV"
//       },
//       "subject": {
//         "name": "Science"
//       },
//       "division": {
//         "name": "B"
//       }
//     }
//   ]
  
