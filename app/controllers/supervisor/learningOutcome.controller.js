const db = require('../../models');
const LearningOutcome = db.learningOutcome;

// POST: Add multiple Learning Outcome entries
exports.addLearningOutcome = async (req, res) => {
  try {
    const { teacherId, texts } = req.body;

    if (!teacherId || !Array.isArray(texts)) {
      return res.status(400).send({ message: 'Teacher ID and texts are required.' });
    }

    const lastEntry = await LearningOutcome.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    const data = texts.map((text) => ({
      id: nextId++,
      teacherId,
      text,
    }));

    const newEntries = await LearningOutcome.bulkCreate(data);

    res.status(200).send({ message: 'Learning Outcome added successfully!', data: newEntries });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error adding Learning Outcome.', error: error.message });
  }
};

// GET: Retrieve Learning Outcome entries for a specific teacher
exports.getLearningOutcome = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entries = await LearningOutcome.findAll({ where: { teacherId } });

    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Learning Outcome.', error: error.message });
  }
};
