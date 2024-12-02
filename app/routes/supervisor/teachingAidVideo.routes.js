const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/teachingAidVideo.controller');

// POST: Add multiple video links
router.post('/add', controller.addTeachingAidVideos);

// GET: Retrieve video links for a specific teacher
router.get('/:teacherId', controller.getTeachingAidVideos);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "videoLinks": [
//       "https://www.youtube.com/watch?v=example1",
//       "https://www.youtube.com/watch?v=example2",
//       "https://vimeo.com/example3"
//     ]
// }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "videoLink": "https://www.youtube.com/watch?v=example1",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "videoLink": "https://www.youtube.com/watch?v=example2",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
