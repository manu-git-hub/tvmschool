const db = require('../../models');
const TeachingAidOthers = db.teaching_aid_others;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Teaching Aid Others
 */
exports.addTeachingAidOthers = async (req, res) => {
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
    const duplicate = await TeachingAidOthers.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Teaching aids for LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exist for this faculty.`,
      });
    }

    // Validation
    if (!content || !Array.isArray(content) || content.length < 1) {
      return res.status(400).send({ message: 'At least one teaching aid is required.' });
    }
    if (content.length > 3) {
      return res.status(400).send({ message: 'A maximum of 3 teaching aids can be added.' });
    }

    // Add a single row to the database with the content as an array
    await TeachingAidOthers.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      content: content,
    });

    res.status(201).send({ message: 'Teaching aids added successfully.' });
  } catch (error) {
    console.error('Error adding teaching aids:', error.message);
    res.status(500).send({ message: 'An error occurred while adding teaching aids.', error: error.message });
  }
};

/**
 * Edit Teaching Aid Others
 */
exports.editTeachingAidOthers = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { content } = req.body;

    // Validate content
    if (!content || !Array.isArray(content) || content.length === 0) {
      return res.status(400).send({ message: 'Content must be a non-empty array.' });
    }

    // Find the record to update
    const teachingAid = await TeachingAidOthers.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!teachingAid) {
      return res.status(404).send({
        message: `No teaching aids found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    teachingAid.content = content; // Store as array
    await teachingAid.save();

    res.status(200).send({ message: 'Teaching aids updated successfully.' });
  } catch (error) {
    console.error('Error editing teaching aids:', error.message);
    res.status(500).send({ message: 'An error occurred while editing teaching aids.', error: error.message });
  }
};

/**
 * Delete Teaching Aid Others
 */
exports.deleteTeachingAidOthers = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await TeachingAidOthers.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No teaching aids found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Teaching aids deleted successfully.' });
  } catch (error) {
    console.error('Error deleting teaching aids:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting the teaching aids.', error: error.message });
  }
};

/**
 * Get Teaching Aid Others by Query
 */
exports.getTeachingAidOthersByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const teachingAids = await TeachingAidOthers.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (teachingAids.length === 0) {
      return res.status(404).send({
        message: `No teaching aids found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(teachingAids);
  } catch (error) {
    console.error('Error fetching teaching aids:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching teaching aids.',
      error: error.message,
    });
  }
};

/**
 * Get All Teaching Aid Others
 */
exports.getAllTeachingAidOthers = async (req, res) => {
  try {
    const teachingAids = await TeachingAidOthers.findAll();
    res.status(200).send(teachingAids);
  } catch (error) {
    console.error('Error fetching all teaching aids:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all teaching aids.',
      error: error.message,
    });
  }
};
