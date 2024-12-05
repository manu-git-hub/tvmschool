const db = require('../models');
const LessonPlanAssignment = db.lesson_plan_assignment; 

exports.assignLessonPlan = async (req, res) => {
  try {
    const {
      facultyId,
      subjectName,
      grade,
      division,
      lpCycleNumber,
      unitNumber,
      unitName,
      term,
      lessonPlanName,
      dateOfSubmission,
      lpDueDate,
      dateOfApproval,
    } = req.body;

    // Validate required fields
    if (!facultyId || !subjectName || !grade || !division) {
      return res.status(400).send({ message: 'Missing required fields.' });
    }

    // Validate facultyId
    const faculty = await db.user.findByPk(facultyId, { include: ['roles'] });
    if (!faculty) {
      return res.status(404).send({ message: 'Faculty not found!' });
    }

    // Check if the user has the "faculty" role
    const hasFacultyRole = faculty.roles.some((role) => role.name === 'faculty');
    if (!hasFacultyRole) {
      return res.status(403).send({ message: 'The provided user is not a faculty member!' });
    }

    // Create lesson plan assignment
    const assignment = await LessonPlanAssignment.create({
      faculty_id: facultyId,
      subject_name: subjectName,
      grade,
      division,
      lp_cycle_number: lpCycleNumber,
      unit_number: unitNumber,
      unit_name: unitName,
      term,
      lesson_plan_name: lessonPlanName,
      date_of_submission: dateOfSubmission,
      lp_due_date: lpDueDate,
      date_of_approval: dateOfApproval,
      status: 'pending', // Default value Want to create API
    });

    res.status(201).send({
      message: 'Lesson plan assigned successfully.',
      assignment,
    });
  } catch (error) {
    console.error('Error assigning lesson plan:', error.message);
    res.status(500).send({ message: 'An error occurred while assigning the lesson plan.' });
  }
};
