const express = require('express');
const router = express.Router();

// Route handler for /api/test/all
router.get('/all', (req, res) => {
    res.json({ message: 'All tests fetched successfully!' });
});

module.exports = router;
