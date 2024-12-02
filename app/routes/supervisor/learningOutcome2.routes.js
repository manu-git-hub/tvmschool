const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/learningOutcome2.controller');

// POST: Add multiple Learning Outcome (2) entries
router.post('/add', controller.addLearningOutcome2);

// GET: Retrieve Learning Outcome (2) entries for a specific teacher
router.get('/:teacherId', controller.getLearningOutcome2);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "texts": [
//       "Learning outcome 2 text 1",
//       "Learning outcome 2 text 2",
//       "Learning outcome 2 text 3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "text": "Learning outcome 2 text 1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "text": "Learning outcome 2 text 2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
