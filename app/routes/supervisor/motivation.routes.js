const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/motivation.controller');

// POST: Add multiple motivations
router.post('/add', controller.motivation);

// GET: Retrieve motivations for a specific teacher
router.get('/:teacherId', controller.getMotivation);

module.exports = router;



//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "0004",
//     "motivations": [
//       "Motivation 1 text within 250 characters.",
//       "Motivation 2 text also within 250 characters."
//     ]
//   }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "motivationText": "Motivation 1 text within 250 characters.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "motivationText": "Motivation 2 text also within 250 characters.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
  