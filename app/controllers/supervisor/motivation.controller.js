const db = require('../../models');
const Motivation = db.motivation;

// POST: Add multiple motivations
exports.motivation = async (req, res) => {
  try {
    const { teacherId, motivations } = req.body;

    // Validate inputs
    if (!teacherId || !Array.isArray(motivations)) {
      return res.status(400).send({ message: 'Teacher ID and an array of motivations are required.' });
    }

    // Check if any motivation exceeds character limit
    const invalidTexts = motivations.filter((text) => text.length > 250);
    if (invalidTexts.length > 0) {
      return res.status(400).send({
        message: 'Some motivations exceed 250 characters.',
        invalidTexts,
      });
    }

    // Get the next ID
    const lastEntry = await Motivation.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    // Prepare data with custom IDs
    const motivationData = motivations.map((text) => ({
      id: nextId++,
      teacherId,
      motivationText: text,
    }));

    // Save all motivations
    const newMotivations = await Motivation.bulkCreate(motivationData);

    res.status(200).send({
      message: 'Motivations added successfully!',
      data: newMotivations,
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      // Handle foreign key constraint errors specifically
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error adding motivations.', error: error.message });
  }
};

// GET: Retrieve motivations for a specific teacher
exports.getMotivation = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).send({ message: 'Teacher ID is required.' });
    }

    const motivations = await Motivation.findAll({ where: { teacherId } });
    res.status(200).send(motivations);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching motivations.', error: error.message });
  }
};
