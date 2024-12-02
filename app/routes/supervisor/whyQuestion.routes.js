const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/whyQuestion.controller');

// POST: Add multiple Why Questions
router.post('/add', controller.addWhyQuestion);

// GET: Retrieve Why Questions for a specific teacher
router.get('/:teacherId', controller.getWhyQuestion);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "texts": [
//       "Why question 1",
//       "Why question 2",
//       "Why question 3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "text": "Why question 1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "text": "Why question 2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
