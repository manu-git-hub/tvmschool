const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/teachingAid.controller');

// POST: Add multiple teaching aids
router.post('/add', controller.addTeachingAids);

// GET: Retrieve teaching aids for a specific teacher
router.get('/:teacherId', controller.getTeachingAids);

module.exports = router;



//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "teachingAids": [
//       "Teaching aid text 1 within 300 characters.",
//       "Teaching aid text 2 also within 300 characters."
//     ]
//   }
//

//GET  
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "teachingAidText": "Teaching aid text 1 within 300 characters.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "teachingAidText": "Teaching aid text 2 also within 300 characters.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
  