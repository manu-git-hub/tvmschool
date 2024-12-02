const db = require('../../models');
const ActivitiesHomework = db.activitiesHomework;

// POST: Add multiple Activities & Homework entries
exports.addActivitiesHomework = async (req, res) => {
  try {
    const { teacherId, texts } = req.body;

    if (!teacherId || !Array.isArray(texts)) {
      return res.status(400).send({ message: 'Teacher ID and texts are required.' });
    }

    const lastEntry = await ActivitiesHomework.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    const data = texts.map((text) => ({
      id: nextId++,
      teacherId,
      text,
    }));

    const newEntries = await ActivitiesHomework.bulkCreate(data);

    res.status(200).send({ message: 'Activities & Homework added successfully!', data: newEntries });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error adding Activities & Homework.', error: error.message });
  }
};

// GET: Retrieve Activities & Homework entries for a specific teacher
exports.getActivitiesHomework = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entries = await ActivitiesHomework.findAll({ where: { teacherId } });

    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Activities & Homework.', error: error.message });
  }
};
