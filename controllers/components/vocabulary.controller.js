const db = require('../../models');
const Vocabulary = db.vocabulary;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Vocabulary
 */
exports.addVocabulary = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, words } = req.body;

    // Validate facultyId, lpCycleNumber, and academicYear in lesson_plan_assignments
    const assignment = await LessonPlanAssignment.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!assignment) {
      return res.status(400).send({
        message: `Invalid details: No lesson plan found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Check for duplicate lp_cycle_number and academic_year for the faculty
    const duplicate = await Vocabulary.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Vocabulary for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exists for this faculty.`,
      });
    }

    // Validation
    if (!words || !Array.isArray(words) || words.length < 1) {
      return res.status(400).send({ message: 'At least one vocabulary word is required.' });
    }
    if (words.length > 20) {
      return res.status(400).send({ message: 'A maximum of 20 vocabulary words can be added.' });
    }

    // Add the Vocabulary entry
    await Vocabulary.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      words,
    });

    res.status(201).send({ message: 'Vocabulary added successfully.' });
  } catch (error) {
    console.error('Error adding vocabulary:', error.message);
    res.status(500).send({ message: 'An error occurred while adding vocabulary.', error: error.message });
  }
};

/**
 * Edit Vocabulary
 */
exports.editVocabulary = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { words } = req.body;

    // Validate words
    if (!words || !Array.isArray(words) || words.length === 0) {
      return res.status(400).send({ message: 'Words must be a non-empty array.' });
    }

    // Find the record to update
    const vocabulary = await Vocabulary.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!vocabulary) {
      return res.status(404).send({
        message: `No vocabulary found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    vocabulary.words = words;
    await vocabulary.save();

    res.status(200).send({ message: 'Vocabulary updated successfully.' });
  } catch (error) {
    console.error('Error editing vocabulary:', error.message);
    res.status(500).send({ message: 'An error occurred while editing vocabulary.', error: error.message });
  }
};

/**
 * Delete Vocabulary
 */
exports.deleteVocabulary = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await Vocabulary.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No vocabulary found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Vocabulary deleted successfully.' });
  } catch (error) {
    console.error('Error deleting vocabulary:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting vocabulary.', error: error.message });
  }
};

/**
 * Get Vocabulary by Query
 */
exports.getVocabularyByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const vocabularies = await Vocabulary.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (vocabularies.length === 0) {
      return res.status(404).send({
        message: `No vocabulary found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(vocabularies);
  } catch (error) {
    console.error('Error fetching vocabulary:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching vocabulary.',
      error: error.message,
    });
  }
};

/**
 * Get All Vocabulary
 */
exports.getAllVocabulary = async (req, res) => {
  try {
    const vocabularies = await Vocabulary.findAll();
    res.status(200).send(vocabularies);
  } catch (error) {
    console.error('Error fetching all vocabulary:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all vocabulary.',
      error: error.message,
    });
  }
};
