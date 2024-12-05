const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

module.exports = router;
