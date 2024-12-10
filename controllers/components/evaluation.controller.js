const db = require('../../models');
const Evaluation = db.evaluations;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Evaluation
 */
exports.addEvaluation = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, evaluationText } = req.body;

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
    const duplicate = await Evaluation.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Evaluation for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exists for this faculty.`,
      });
    }

    // Validation
    if (!evaluationText || evaluationText.trim() === '') {
      return res.status(400).send({ message: 'Evaluation text cannot be empty.' });
    }

    // Add the Evaluation entry
    await Evaluation.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      evaluation_text: evaluationText,
    });

    res.status(201).send({ message: 'Evaluation added successfully.' });
  } catch (error) {
    console.error('Error adding evaluation:', error.message);
    res.status(500).send({ message: 'An error occurred while adding evaluation.', error: error.message });
  }
};

/**
 * Edit Evaluation
 */
exports.editEvaluation = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { evaluationText } = req.body;

    // Validate evaluationText
    if (!evaluationText || evaluationText.trim() === '') {
      return res.status(400).send({ message: 'Evaluation text cannot be empty.' });
    }

    // Find the record to update
    const evaluation = await Evaluation.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!evaluation) {
      return res.status(404).send({
        message: `No evaluation found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    evaluation.evaluation_text = evaluationText;
    await evaluation.save();

    res.status(200).send({ message: 'Evaluation updated successfully.' });
  } catch (error) {
    console.error('Error editing evaluation:', error.message);
    res.status(500).send({ message: 'An error occurred while editing evaluation.', error: error.message });
  }
};

/**
 * Delete Evaluation
 */
exports.deleteEvaluation = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await Evaluation.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No evaluation found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Evaluation deleted successfully.' });
  } catch (error) {
    console.error('Error deleting evaluation:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting evaluation.', error: error.message });
  }
};

/**
 * Get Evaluation by Query
 */
exports.getEvaluationByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const evaluations = await Evaluation.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (evaluations.length === 0) {
      return res.status(404).send({
        message: `No evaluations found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching evaluations.',
      error: error.message,
    });
  }
};

/**
 * Get All Evaluations
 */
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.status(200).send(evaluations);
  } catch (error) {
    console.error('Error fetching all evaluations:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all evaluations.',
      error: error.message,
    });
  }
};
