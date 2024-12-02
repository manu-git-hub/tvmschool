const db = require('../../models');
const STEM = db.stem;

// POST: Add or update STEM entries
exports.addOrUpdateSTEM = async (req, res) => {
  try {
    const { teacherId, science, technology, engineering, mathematics } = req.body;

    if (!teacherId) {
      return res.status(400).send({ message: 'Teacher ID is required.' });
    }

    // Check if the teacher's STEM record already exists
    const existingEntry = await STEM.findOne({ where: { teacherId } });

    if (existingEntry) {
      // Update existing record
      await existingEntry.update({
        science: science || existingEntry.science,
        technology: technology || existingEntry.technology,
        engineering: engineering || existingEntry.engineering,
        mathematics: mathematics || existingEntry.mathematics,
      });

      return res.status(200).send({
        message: 'STEM data updated successfully!',
        data: existingEntry,
      });
    }

    // Create a new STEM entry
    const lastEntry = await STEM.findOne({ order: [['id', 'DESC']] });
    const nextId = lastEntry ? lastEntry.id + 1 : 1;

    const newEntry = await STEM.create({
      id: nextId,
      teacherId,
      science,
      technology,
      engineering,
      mathematics,
    });

    res.status(200).send({
      message: 'STEM data added successfully!',
      data: newEntry,
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error managing STEM data.', error: error.message });
  }
};

// GET: Retrieve STEM data for a specific teacher
exports.getSTEM = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entry = await STEM.findOne({ where: { teacherId } });

    if (!entry) {
      return res.status(404).send({ message: 'STEM data not found for this teacher.' });
    }

    res.status(200).send(entry);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching STEM data.', error: error.message });
  }
};
