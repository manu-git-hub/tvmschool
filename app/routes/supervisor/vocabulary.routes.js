const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/vocabulary.controller');

// POST: Add multiple vocabulary entries
router.post('/add', controller.addVocabulary);

// GET: Retrieve vocabulary entries for a specific teacher
router.get('/:teacherId', controller.getVocabulary);

module.exports = router;



//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "vocabularyList": [
//       {
//         "word": "Apple",
//         "meaning": "A fruit",
//         "exampleSentence": "An apple a day keeps the doctor away."
//       },
//       {
//         "word": "Run",
//         "meaning": "To move fast",
//         "exampleSentence": "She loves to run in the park every morning."
//       }
//     ]
//   }
//
//GET
// [
//     {
//       "id": 1,
//       "teacherId": "TCH001",
//       "word": "Apple",
//       "meaning": "A fruit",
//       "exampleSentence": "An apple a day keeps the doctor away.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     },
//     {
//       "id": 2,
//       "teacherId": "TCH001",
//       "word": "Run",
//       "meaning": "To move fast",
//       "exampleSentence": "She loves to run in the park every morning.",
//       "createdAt": "2024-12-02T00:00:00.000Z",
//       "updatedAt": "2024-12-02T00:00:00.000Z"
//     }
//   ]
  