const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/learningOutcome.controller');

// POST: Add multiple Learning Outcome entries
router.post('/add', controller.addLearningOutcome);

// GET: Retrieve Learning Outcome entries for a specific teacher
router.get('/:teacherId', controller.getLearningOutcome);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "texts": [
//       "Learning outcome text 1",
//       "Learning outcome text 2",
//       "Learning outcome text 3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "text": "Learning outcome text 1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "text": "Learning outcome text 2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
