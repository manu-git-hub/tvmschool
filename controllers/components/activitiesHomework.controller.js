const db = require('../../models');
const ActivitiesHomework = db.activities_homework;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Activities & Homework
 */
exports.addActivitiesHomework = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, items } = req.body;

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
    const duplicate = await ActivitiesHomework.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Activities & Homework for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!items || !Array.isArray(items) || items.length < 1) {
      return res.status(400).send({ message: 'At least one activity or homework item is required.' });
    }
    if (items.length > 10) {
      return res.status(400).send({ message: 'A maximum of 10 activities or homework items can be added.' });
    }

    // Add the Activities & Homework entry
    await ActivitiesHomework.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      items,
    });

    res.status(201).send({ message: 'Activities & Homework added successfully.' });
  } catch (error) {
    console.error('Error adding Activities & Homework:', error.message);
    res.status(500).send({ message: 'An error occurred while adding Activities & Homework.', error: error.message });
  }
};

/**
 * Edit Activities & Homework
 */
exports.editActivitiesHomework = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ message: 'Items must be a non-empty array.' });
    }

    // Find the record to update
    const activitiesHomework = await ActivitiesHomework.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!activitiesHomework) {
      return res.status(404).send({
        message: `No Activities & Homework found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    activitiesHomework.items = items;
    await activitiesHomework.save();

    res.status(200).send({ message: 'Activities & Homework updated successfully.' });
  } catch (error) {
    console.error('Error editing Activities & Homework:', error.message);
    res.status(500).send({ message: 'An error occurred while editing Activities & Homework.', error: error.message });
  }
};

/**
 * Delete Activities & Homework
 */
exports.deleteActivitiesHomework = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await ActivitiesHomework.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No Activities & Homework found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Activities & Homework deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Activities & Homework:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting Activities & Homework.', error: error.message });
  }
};

/**
 * Get Activities & Homework by Query
 */
exports.getActivitiesHomeworkByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const items = await ActivitiesHomework.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (items.length === 0) {
      return res.status(404).send({
        message: `No Activities & Homework found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(items);
  } catch (error) {
    console.error('Error fetching Activities & Homework:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching Activities & Homework.',
      error: error.message,
    });
  }
};

/**
 * Get All Activities & Homework
 */
exports.getAllActivitiesHomework = async (req, res) => {
  try {
    const items = await ActivitiesHomework.findAll();
    res.status(200).send(items);
  } catch (error) {
    console.error('Error fetching all Activities & Homework:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all Activities & Homework.',
      error: error.message,
    });
  }
};
