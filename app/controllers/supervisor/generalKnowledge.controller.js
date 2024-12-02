const db = require('../../models');
const GeneralKnowledge = db.generalKnowledge;

exports.addGeneralKnowledge = async (req, res) => {
  try {
    const { teacherId, texts } = req.body;

    if (!teacherId || !Array.isArray(texts)) {
      return res.status(400).send({ message: 'Teacher ID and texts are required.' });
    }

    const lastEntry = await GeneralKnowledge.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    const data = texts.map((text) => ({
      id: nextId++,
      teacherId,
      text,
    }));

    const newEntries = await GeneralKnowledge.bulkCreate(data);

    res.status(200).send({ message: 'General Knowledge added successfully!', data: newEntries });
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

exports.getGeneralKnowledge = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entries = await GeneralKnowledge.findAll({ where: { teacherId } });

    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching General Knowledge.', error: error.message });
  }
};
