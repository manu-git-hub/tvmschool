const db = require('../../models');
const STEM = db.stem;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add STEM Entries
 */
exports.addSTEM = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear, science, technology, engineering, mathematics } = req.body;

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
    const duplicate = await STEM.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `STEM entries for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!science || !technology || !engineering || !mathematics) {
      return res.status(400).send({ message: 'All STEM fields (Science, Technology, Engineering, Mathematics) are required.' });
    }

    // Add the STEM entry
    await STEM.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      science,
      technology,
      engineering,
      mathematics,
    });

    res.status(201).send({ message: 'STEM entries added successfully.' });
  } catch (error) {
    console.error('Error adding STEM entries:', error.message);
    res.status(500).send({ message: 'An error occurred while adding STEM entries.', error: error.message });
  }
};

/**
 * Edit STEM Entries
 */
exports.editSTEM = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { science, technology, engineering, mathematics } = req.body;

    // Find the record to update
    const stem = await STEM.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!stem) {
      return res.status(404).send({
        message: `No STEM entries found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    if (science) stem.science = science;
    if (technology) stem.technology = technology;
    if (engineering) stem.engineering = engineering;
    if (mathematics) stem.mathematics = mathematics;

    await stem.save();

    res.status(200).send({ message: 'STEM entries updated successfully.' });
  } catch (error) {
    console.error('Error editing STEM entries:', error.message);
    res.status(500).send({ message: 'An error occurred while editing STEM entries.', error: error.message });
  }
};

/**
 * Delete STEM Entries
 */
exports.deleteSTEM = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await STEM.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No STEM entries found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'STEM entries deleted successfully.' });
  } catch (error) {
    console.error('Error deleting STEM entries:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting STEM entries.', error: error.message });
  }
};

/**
 * Get STEM Entries by Query
 */
exports.getSTEMByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const stemEntries = await STEM.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (stemEntries.length === 0) {
      return res.status(404).send({
        message: `No STEM entries found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(stemEntries);
  } catch (error) {
    console.error('Error fetching STEM entries:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching STEM entries.',
      error: error.message,
    });
  }
};

/**
 * Get All STEM Entries
 */
exports.getAllSTEM = async (req, res) => {
  try {
    const stemEntries = await STEM.findAll();
    res.status(200).send(stemEntries);
  } catch (error) {
    console.error('Error fetching all STEM entries:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all STEM entries.',
      error: error.message,
    });
  }
};
