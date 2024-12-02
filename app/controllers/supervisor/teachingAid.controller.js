const db = require('../../models');
const TeachingAid = db.teachingAid;

// POST: Add multiple teaching aids
exports.addTeachingAids = async (req, res) => {
  try {
    const { teacherId, teachingAids } = req.body;

    // Validate inputs
    if (!teacherId || !Array.isArray(teachingAids)) {
      return res.status(400).send({ message: 'Teacher ID and an array of teaching aids are required.' });
    }

    // Check if any teaching aid exceeds character limit
    const invalidTexts = teachingAids.filter((text) => text.length > 300);
    if (invalidTexts.length > 0) {
      return res.status(400).send({
        message: 'Some teaching aids exceed 300 characters.',
        invalidTexts,
      });
    }

    // Get the next ID
    const lastEntry = await TeachingAid.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    // Prepare data with custom IDs
    const teachingAidData = teachingAids.map((text) => ({
      id: nextId++,
      teacherId,
      teachingAidText: text,
    }));

    // Save all teaching aids
    const newTeachingAids = await TeachingAid.bulkCreate(teachingAidData);

    res.status(200).send({
      message: 'Teaching aids added successfully!',
      data: newTeachingAids,
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        // Handle foreign key constraint errors specifically
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

      // Handle other errors
    res.status(500).send({ message: 'Error adding teaching aids.', error: error.message });
  }
};
  

// GET: Retrieve teaching aids for a specific teacher
exports.getTeachingAids = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).send({ message: 'Teacher ID is required.' });
    }

    const teachingAids = await TeachingAid.findAll({ where: { teacherId } });
    res.status(200).send(teachingAids);
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).send({
          message: 'Invalid teacher ID. Please provide a valid teacher ID that exists in the system.',
        });
      }
  
      // Handle other unexpected errors
      res.status(500).send({ message: 'Error adding teaching aids.', error: error.message });
  }
};
