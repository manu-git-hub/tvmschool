const express = require('express');
const router = express.Router();
const controller = require('../../controllers/main/submit.controller');

// POST: Check teacher submission across all tables
router.post('/check', controller.checkSubmission);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//   "teacherId": "TCH001"
// }
//
//SUCCESS RESPONSE
// {
//   "message": "Success! Teacher ID is present in all required tables."
// }
//
//ERROR RESPONSE
// {
//   "message": "Teacher ID is missing in the following tables.",
//   "missingTables": ["motivation", "stem"]
// }
