const db = require('../../models');
const PhysicalActivity = db.physical_activities;
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Add Physical Activities
 */
exports.addPhysicalActivities = async (req, res) => {
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
    const duplicate = await PhysicalActivity.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (duplicate) {
      return res.status(400).send({
        message: `Physical activity with LP Cycle Number '${lpCycleNumber}' and Academic Year '${academicYear}' already exists for this faculty.`,
      });
    }

    // Validation
    if (!content || !Array.isArray(content) || content.length < 1) {
      return res.status(400).send({ message: 'At least one physical activity is required.' });
    }
    if (content.length > 3) {
      return res.status(400).send({ message: 'A maximum of 3 physical activities can be added.' });
    }

    // Add a single row to the database with the content as an array
    await PhysicalActivity.create({
      faculty_id: facultyId,
      lp_cycle_number: lpCycleNumber,
      academic_year: academicYear,
      content: content, 
    });

    res.status(201).send({ message: 'Physical activities added successfully.' });
  } catch (error) {
    console.error('Error adding physical activities:', error.message);
    res.status(500).send({ message: 'An error occurred while adding physical activities.', error: error.message });
  }
};

/**
 * Edit Physical Activities
 */
exports.editPhysicalActivities = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;
    const { content } = req.body;

    // Validate content
    if (!content || !Array.isArray(content) || content.length === 0) {
      return res.status(400).send({ message: 'Content must be a non-empty array.' });
    }

    // Find the record to update
    const activity = await PhysicalActivity.findOne({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!activity) {
      return res.status(404).send({
        message: `No physical activity found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    // Update the record
    activity.content = content; // Store as array
    await activity.save();

    res.status(200).send({ message: 'Physical activity updated successfully.' });
  } catch (error) {
    console.error('Error editing physical activity:', error.message);
    res.status(500).send({ message: 'An error occurred while editing the physical activity.', error: error.message });
  }
};

/**
 * Delete Physical Activities
 */
exports.deletePhysicalActivities = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    // Find and delete the record
    const deleted = await PhysicalActivity.destroy({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (!deleted) {
      return res.status(404).send({
        message: `No physical activity found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send({ message: 'Physical activity deleted successfully.' });
  } catch (error) {
    console.error('Error deleting physical activity:', error.message);
    res.status(500).send({ message: 'An error occurred while deleting the physical activity.', error: error.message });
  }
};

/**
 * Get Physical Activities by Query
 */
exports.getPhysicalActivitiesByQuery = async (req, res) => {
  try {
    const { facultyId, lpCycleNumber, academicYear } = req.query;

    const activities = await PhysicalActivity.findAll({
      where: {
        faculty_id: facultyId,
        lp_cycle_number: lpCycleNumber,
        academic_year: academicYear,
      },
    });

    if (activities.length === 0) {
      return res.status(404).send({
        message: `No physical activities found for Faculty ID '${facultyId}', LP Cycle Number '${lpCycleNumber}', and Academic Year '${academicYear}'.`,
      });
    }

    res.status(200).send(activities);
  } catch (error) {
    console.error('Error fetching physical activities:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching physical activities.',
      error: error.message,
    });
  }
};

/**
 * Get All Physical Activities
 */
exports.getAllPhysicalActivities = async (req, res) => {
  try {
    const activities = await PhysicalActivity.findAll();
    res.status(200).send(activities);
  } catch (error) {
    console.error('Error fetching all physical activities:', error.message);
    res.status(500).send({
      message: 'An error occurred while fetching all physical activities.',
      error: error.message,
    });
  }
};
