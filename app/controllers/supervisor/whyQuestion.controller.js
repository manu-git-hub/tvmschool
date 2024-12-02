const db = require('../../models');
const WhyQuestion = db.whyQuestion;

// POST: Add multiple Why Questions
exports.addWhyQuestion = async (req, res) => {
  try {
    const { teacherId, texts } = req.body;

    if (!teacherId || !Array.isArray(texts)) {
      return res.status(400).send({ message: 'Teacher ID and texts are required.' });
    }

    const lastEntry = await WhyQuestion.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    const data = texts.map((text) => ({
      id: nextId++,
      teacherId,
      text,
    }));

    const newEntries = await WhyQuestion.bulkCreate(data);

    res.status(200).send({ message: 'Why Questions added successfully!', data: newEntries });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error adding Why Questions.', error: error.message });
  }
};

// GET: Retrieve Why Questions for a specific teacher
exports.getWhyQuestion = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entries = await WhyQuestion.findAll({ where: { teacherId } });

    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Why Questions.', error: error.message });
  }
};
