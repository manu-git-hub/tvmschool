const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/activitiesHomework.controller');

// POST: Add multiple Activities & Homework entries
router.post('/add', controller.addActivitiesHomework);

// GET: Retrieve Activities & Homework entries for a specific teacher
router.get('/:teacherId', controller.getActivitiesHomework);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "texts": [
//       "Activity and homework 1",
//       "Activity and homework 2",
//       "Activity and homework 3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "text": "Activity and homework 1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "text": "Activity and homework 2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
