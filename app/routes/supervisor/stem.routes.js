const express = require('express');
const router = express.Router();
const controller = require('../../controllers/supervisor/stem.controller');

// POST: Add or update STEM entries
router.post('/addOrUpdate', controller.addOrUpdateSTEM);

// GET: Retrieve STEM data for a specific teacher
router.get('/:teacherId', controller.getSTEM);

module.exports = router;


//JSON -- FOR Reference only
//
//POST
// {
//     "teacherId": "TCH001",
//     "science": "Science data goes here. Maximum 550 characters.",
//     "technology": "Technology data goes here. Maximum 550 characters.",
//     "engineering": "Engineering data goes here. Maximum 550 characters.",
//     "mathematics": "Mathematics data goes here. Maximum 550 characters."
// }
//
//GET
// {
//     "id": 1,
//     "teacherId": "TCH001",
//     "science": "Science data goes here.",
//     "technology": "Technology data goes here.",
//     "engineering": "Engineering data goes here.",
//     "mathematics": "Mathematics data goes here.",
//     "createdAt": "2024-12-02T00:00:00.000Z",
//     "updatedAt": "2024-12-02T00:00:00.000Z"
// }
