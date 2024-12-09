const db = require('../../models');
const Motivations = db.motivations;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Motivations
 */
exports.addMotivations = async (req, res) => {
  try {
    const { facultyId, content, lpCycleNumber, academicYear } = req.body;

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
    const duplicate = await Motivations.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Motivations for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!content || !Array.isArray(content) || content.length < 1) {
      return res.status(400).send({ message: 'At least one motivation is required.' });
    }
    if (content.length > 5) {
      return res.status(400).send({ message: 'A maximum of 5 motivations can be added.' });
    }

    // Add a single row to the database with the content as an array
    await Motivations.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      content: content,
    });

    res.status(201).send({ message: 'Motivations added successfully.' });
  } catch (error) {
    console.error('Error adding motivations:', error.message);
    res.status(500).send({ message: 'An error occurred while adding motivations.', error: error.message });
  }
};

/**
 * Edit Motivations
 */
exports.editMotivations = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { content } = req.body;

    // Validate content
    if (!content || !Array.isArray(content) || content.length === 0) {
      return res.status(400).send({ message: 'Content must be a non-empty array.' });
    }

    // Find the record to update
    const motivation = await Motivations.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!motivation) {
      return res.status(404).send({
        message: `No motivations found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    motivation.content = content; // Store as array
    await motivation.save();

    res.status(200).send({ message: 'Motivations updated successfully.' });
  } catch (error) {
    console.error('Error editing motivations:', error.message);
    res.status(500).send({ message: 'An error occurred while editing motivations.', error: error.message });
  }
};

/**
 * Delete Motivations
 */
exports.deleteMotivations = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await Motivations.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No motivations found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Motivations deleted successfully.' });
  } catch (error) {
    console.error('Error deleting motivations:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting the motivations.', error: error.message });
  }
};

/**
 * Get Motivations by Query
 */
exports.getMotivationsByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const motivations = await Motivations.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (motivations.length === 0) {
      return res.status(404).send({
        message: `No motivations found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(motivations);
  } catch (error) {
    console.error('Error fetching motivations:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching motivations.',
      error: error.message,
    });
  }
};

/**
 * Get All Motivations
 */
exports.getAllMotivations = async (req, res) => {
  try {
    const motivations = await Motivations.findAll();
    res.status(200).send(motivations);
  } catch (error) {
    console.error('Error fetching all motivations:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all motivations.',
      error: error.message,
    });
  }
};
