const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/physicalActivity.controller');

// GET: Retrieve all predefined physical activities
router.get('/lookup', controller.getPhysicalActivities);

// POST: Assign physical activities to a teacher (max 4)
router.post('/assign', controller.assignTeacherActivities);

// GET: Retrieve assigned physical activities for a teacher
router.get('/:teacherId', controller.getTeacherActivities);

module.exports = router;


//JSON -- FOR Reference only
//
//GET (Lookup Table)
// [
//     { "id": 1, "description": "Physical Activity - 1 - play" },
//     { "id": 2, "description": "Physical Activity - 2 - game" },
//     { "id": 3, "description": "Physical Activity - 3 - dance" },
//     ...
//     { "id": 14, "description": "Physical Activity - 14 - sit" }
// ]
//
//POST (Assign Activities to Teacher)
// {
//     "teacherId": "TCH001",
//     "activityIds": [1, 2, 3, 4]
// }
//
//GET (Retrieve Assigned Activities for Teacher)
// [
//     {
//         "id": 1,
//         "teacherId": "TCH001",
//         "activityId": 1,
//         "physicalActivity": {
//             "id": 1,
//             "description": "Physical Activity - 1 - play"
//         }
//     },
//     {
//         "id": 2,
//         "teacherId": "TCH001",
//         "activityId": 2,
//         "physicalActivity": {
//             "id": 2,
//             "description": "Physical Activity - 2 - game"
//         }
//     }
// ]
