const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/generalKnowledge.controller');

// POST: Add multiple General Knowledge entries
router.post('/add', controller.addGeneralKnowledge);

// GET: Retrieve General Knowledge entries for a specific teacher
router.get('/:teacherId', controller.getGeneralKnowledge);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "texts": [
//       "General knowledge text 1",
//       "General knowledge text 2",
//       "General knowledge text 3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "text": "General knowledge text 1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "text": "General knowledge text 2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
