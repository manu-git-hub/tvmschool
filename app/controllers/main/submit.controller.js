const db = require('../../models');

// List of tables to check
const tables = {
  physicalActivity: db.teacherPhysicalActivity,
  motivation: db.motivation,
  teachingAids: db.teachingAid,
  teachingAidVideos: db.teachingAidVideo,
  generalKnowledge: db.generalKnowledge,
  stem: db.stem,
  vocabulary: db.vocabulary,
  learningOutcome: db.learningOutcome,
  learningOutcome2: db.learningOutcome2,
  whyQuestion: db.whyQuestion,
  activitiesHomework: db.activitiesHomework,
};

exports.checkSubmission = async (req, res) => {
  try {
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).send({ message: 'Teacher ID is required.' });
    }

    const missingTables = [];

    // Check each table for the teacherId
    for (const [tableName, model] of Object.entries(tables)) {
      const count = await model.count({ where: { teacherId } });
      if (count === 0) {
        missingTables.push(tableName);
      }
    }

    // Response based on whether there are missing tables
    if (missingTables.length === 0) {
      return res.status(200).send({ message: 'Success! Teacher ID is present in all required tables.' });
    } else {
      return res.status(400).send({
        message: 'Teacher ID is missing in the following tables.',
        missingTables,
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error checking submission.', error: error.message });
  }
};
