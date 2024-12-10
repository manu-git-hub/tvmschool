const db = require('../../models');
const FiveWQuestions = db.five_w_questions;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Five W Questions
 */
exports.addFiveWQuestions = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, questions } = req.body;

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
    const duplicate = await FiveWQuestions.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Five W Questions for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!questions || !Array.isArray(questions) || questions.length < 5) {
      return res.status(400).send({ message: 'At least 5 questions are required.' });
    }
    if (questions.length > 10) {
      return res.status(400).send({ message: 'A maximum of 10 questions can be added.' });
    }

    // Add the Five W Questions entry
    await FiveWQuestions.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      questions,
    });

    res.status(201).send({ message: 'Five W Questions added successfully.' });
  } catch (error) {
    console.error('Error adding Five W Questions:', error.message);
    res.status(500).send({ message: 'An error occurred while adding Five W Questions.', error: error.message });
  }
};

/**
 * Edit Five W Questions
 */
exports.editFiveWQuestions = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { questions } = req.body;

    // Validate questions
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).send({ message: 'Questions must be a non-empty array.' });
    }

    // Find the record to update
    const fiveW = await FiveWQuestions.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!fiveW) {
      return res.status(404).send({
        message: `No Five W Questions found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    fiveW.questions = questions;
    await fiveW.save();

    res.status(200).send({ message: 'Five W Questions updated successfully.' });
  } catch (error) {
    console.error('Error editing Five W Questions:', error.message);
    res.status(500).send({ message: 'An error occurred while editing Five W Questions.', error: error.message });
  }
};

/**
 * Delete Five W Questions
 */
exports.deleteFiveWQuestions = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await FiveWQuestions.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No Five W Questions found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Five W Questions deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Five W Questions:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting Five W Questions.', error: error.message });
  }
};

/**
 * Get Five W Questions by Query
 */
exports.getFiveWQuestionsByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const fiveW = await FiveWQuestions.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (fiveW.length === 0) {
      return res.status(404).send({
        message: `No Five W Questions found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(fiveW);
  } catch (error) {
    console.error('Error fetching Five W Questions:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching Five W Questions.',
      error: error.message,
    });
  }
};

/**
 * Get All Five W Questions
 */
exports.getAllFiveWQuestions = async (req, res) => {
  try {
    const fiveW = await FiveWQuestions.findAll();
    res.status(200).send(fiveW);
  } catch (error) {
    console.error('Error fetching all Five W Questions:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all Five W Questions.',
      error: error.message,
    });
  }
};
