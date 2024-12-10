const db = require('../../models');
const GeneralKnowledge = db.general_knowledge;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add General Knowledge Items
 */
exports.addGeneralKnowledge = async (req, res) => {
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
    const duplicate = await GeneralKnowledge.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `General Knowledge items for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!items || !Array.isArray(items) || items.length < 1) {
      return res.status(400).send({ message: 'At least one General Knowledge item is required.' });
    }
    if (items.length > 10) {
      return res.status(400).send({ message: 'A maximum of 10 General Knowledge items can be added.' });
    }

    // Add the General Knowledge entry
    await GeneralKnowledge.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      items,
    });

    res.status(201).send({ message: 'General Knowledge items added successfully.' });
  } catch (error) {
    console.error('Error adding General Knowledge items:', error.message);
    res.status(500).send({ message: 'An error occurred while adding General Knowledge items.', error: error.message });
  }
};

/**
 * Edit General Knowledge Items
 */
exports.editGeneralKnowledge = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ message: 'Items must be a non-empty array.' });
    }

    // Find the record to update
    const generalKnowledge = await GeneralKnowledge.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!generalKnowledge) {
      return res.status(404).send({
        message: `No General Knowledge items found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    generalKnowledge.items = items;
    await generalKnowledge.save();

    res.status(200).send({ message: 'General Knowledge items updated successfully.' });
  } catch (error) {
    console.error('Error editing General Knowledge items:', error.message);
    res.status(500).send({ message: 'An error occurred while editing General Knowledge items.', error: error.message });
  }
};

/**
 * Delete General Knowledge Items
 */
exports.deleteGeneralKnowledge = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await GeneralKnowledge.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No General Knowledge items found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'General Knowledge items deleted successfully.' });
  } catch (error) {
    console.error('Error deleting General Knowledge items:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting General Knowledge items.', error: error.message });
  }
};

/**
 * Get General Knowledge Items by Query
 */
exports.getGeneralKnowledgeByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const items = await GeneralKnowledge.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (items.length === 0) {
      return res.status(404).send({
        message: `No General Knowledge items found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(items);
  } catch (error) {
    console.error('Error fetching General Knowledge items:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching General Knowledge items.',
      error: error.message,
    });
  }
};

/**
 * Get All General Knowledge Items
 */
exports.getAllGeneralKnowledge = async (req, res) => {
  try {
    const items = await GeneralKnowledge.findAll();
    res.status(200).send(items);
  } catch (error) {
    console.error('Error fetching all General Knowledge items:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all General Knowledge items.',
      error: error.message,
    });
  }
};

