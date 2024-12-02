const db = require('../../models');
const Vocabulary = db.vocabulary;

// POST: Add multiple vocabulary entries
exports.addVocabulary = async (req, res) => {
    try {
      const { teacherId, vocabularyList } = req.body;
  
      // Validate inputs
      if (!teacherId || !Array.isArray(vocabularyList)) {
        return res.status(400).send({ message: 'Teacher ID and an array of vocabulary items are required.' });
      }
  
      // Check if any field exceeds character limits
      const invalidEntries = vocabularyList.filter(
        (item) =>
          item.word.length > 70 || item.meaning.length > 70 || item.exampleSentence.length > 300
      );
      if (invalidEntries.length > 0) {
        return res.status(400).send({
          message: 'Some vocabulary entries exceed character limits.',
          invalidEntries,
        });
      }
  
      // Get the next ID
      const lastEntry = await Vocabulary.findOne({ order: [['id', 'DESC']] });
      let nextId = lastEntry ? lastEntry.id + 1 : 1;
  
      // Prepare data with custom IDs
      const vocabularyData = vocabularyList.map((item) => ({
        id: nextId++,
        teacherId,
        word: item.word,
        meaning: item.meaning,
        exampleSentence: item.exampleSentence,
      }));
  
      // Save all vocabulary entries
      const newVocabulary = await Vocabulary.bulkCreate(vocabularyData);
  
      res.status(200).send({
        message: 'Vocabulary added successfully!',
        data: newVocabulary,
      });
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).send({
          message: 'Teacher not found. Please provide a valid teacher ID.',
        });
      }
  
      res.status(500).send({ message: 'Error adding vocabulary.', error: error.message });
    }
  };
  

// GET: Retrieve vocabulary entries for a specific teacher
exports.getVocabulary = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).send({ message: 'Teacher ID is required.' });
    }

    const vocabulary = await Vocabulary.findAll({ where: { teacherId } });
    res.status(200).send(vocabulary);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching vocabulary.', error: error.message });
  }
};
