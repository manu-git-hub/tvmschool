const db = require('../../models');
const LearningOutcome = db.learning_outcomes;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Learning Outcomes
 */
exports.addLearningOutcomes = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, outcomes } = req.body;

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
    const duplicate = await LearningOutcome.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Learning Outcomes for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!outcomes || !Array.isArray(outcomes) || outcomes.length < 1) {
      return res.status(400).send({ message: 'At least one Learning Outcome is required.' });
    }
    if (outcomes.length > 10) {
      return res.status(400).send({ message: 'A maximum of 10 Learning Outcomes can be added.' });
    }

    // Add the Learning Outcomes entry
    await LearningOutcome.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      outcomes,
    });

    res.status(201).send({ message: 'Learning Outcomes added successfully.' });
  } catch (error) {
    console.error('Error adding Learning Outcomes:', error.message);
    res.status(500).send({ message: 'An error occurred while adding Learning Outcomes.', error: error.message });
  }
};

/**
 * Edit Learning Outcomes
 */
exports.editLearningOutcomes = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { outcomes } = req.body;

    // Validate outcomes
    if (!outcomes || !Array.isArray(outcomes) || outcomes.length === 0) {
      return res.status(400).send({ message: 'Outcomes must be a non-empty array.' });
    }

    // Find the record to update
    const learningOutcome = await LearningOutcome.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!learningOutcome) {
      return res.status(404).send({
        message: `No Learning Outcomes found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    learningOutcome.outcomes = outcomes;
    await learningOutcome.save();

    res.status(200).send({ message: 'Learning Outcomes updated successfully.' });
  } catch (error) {
    console.error('Error editing Learning Outcomes:', error.message);
    res.status(500).send({ message: 'An error occurred while editing Learning Outcomes.', error: error.message });
  }
};

/**
 * Delete Learning Outcomes
 */
exports.deleteLearningOutcomes = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await LearningOutcome.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No Learning Outcomes found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Learning Outcomes deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Learning Outcomes:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting Learning Outcomes.', error: error.message });
  }
};

/**
 * Get Learning Outcomes by Query
 */
exports.getLearningOutcomesByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const outcomes = await LearningOutcome.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (outcomes.length === 0) {
      return res.status(404).send({
        message: `No Learning Outcomes found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(outcomes);
  } catch (error) {
    console.error('Error fetching Learning Outcomes:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching Learning Outcomes.',
      error: error.message,
    });
  }
};

/**
 * Get All Learning Outcomes
 */
exports.getAllLearningOutcomes = async (req, res) => {
  try {
    const outcomes = await LearningOutcome.findAll();
    res.status(200).send(outcomes);
  } catch (error) {
    console.error('Error fetching all Learning Outcomes:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all Learning Outcomes.',
      error: error.message,
    });
  }
};
