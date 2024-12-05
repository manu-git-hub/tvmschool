const db = require('../models');
const { generateLpCycleNumber } = require('../helpers/lessonPlanHelpers');
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Check for duplicate lesson plans
 */
const isDuplicateLessonPlan = async (academicYear, grade, division, term, subjectName, lessonPlanName) => {
  const duplicate = await LessonPlanAssignment.findOne({
    where: {
      academic_year: academicYear,
      grade: JSON.stringify(grade),
      division: JSON.stringify(division),
      term,
      subject_name: JSON.stringify(subjectName),
      lesson_plan_name: lessonPlanName,
    },
  });
  return !!duplicate;
};

/**
 * Assign a new lesson plan
 */
exports.assignLessonPlan = async (req, res) => {
  try {
    const {
      facultyId,
      subjectName,
      grade,
      division,
      unitNumber,
      unitName,
      term,
      lessonPlanName,
      academicYear,
      lpDueDate,
    } = req.body;

    // Validate required fields
    if (!facultyId || !academicYear || !grade || !division || !term || !subjectName || !lessonPlanName || !lpDueDate) {
      return res.status(400).send({ message: 'Missing required fields, including lp_due_date!' });
    }

    // Ensure lp_due_date is valid
    const lpDueDateParsed = new Date(lpDueDate);
    if (isNaN(lpDueDateParsed.getTime())) {
      return res.status(400).send({ message: 'Invalid lp_due_date format. Use a valid date format!' });
    }

    // Check if facultyId belongs to a faculty user
    const facultyUser = await db.user.findOne({
      where: { userID: facultyId },
      include: {
        model: db.role,
        where: { name: 'faculty' },
      },
    });

    if (!facultyUser) {
      return res.status(400).send({ message: 'Invalid faculty ID or user is not a faculty member.' });
    }

    // Generate LP Cycle Number for the specific user
    let lpCycleNumber;
    try {
      lpCycleNumber = await generateLpCycleNumber(facultyId, academicYear);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    // Check for duplicates
    // if (await isDuplicateLessonPlan(academicYear, grade, division, term, subjectName, lessonPlanName)) {
    //   return res.status(400).send({ message: 'Duplicate lesson plan not allowed!' });
    // }

    // Create lesson plan assignment
    const assignment = await LessonPlanAssignment.create({
      faculty_id: facultyId,
      academic_year: academicYear,
      grade: JSON.stringify(grade),
      division: JSON.stringify(division),
      lp_cycle_number: lpCycleNumber,
      unit_number: unitNumber,
      unit_name: unitName,
      term,
      subject_name: JSON.stringify(subjectName),
      lesson_plan_name: lessonPlanName,
      lp_due_date: lpDueDateParsed,
      date_of_submission: null,
      date_of_approval: null,
      status: 'pending',
    });

    res.status(201).send({
      message: 'Lesson plan assigned successfully.',
      assignment,
    });
  } catch (error) {
    console.error('Error assigning lesson plan:', error.message);
    res.status(500).send({ message: 'An error occurred while assigning the lesson plan.', error: error.message });
  }
};

/**
 * Get all lesson plans
 */
exports.getAllLessonPlans = async (req, res) => {
  try {
    const { status } = req.query; // Optional query parameter to filter by status
    const whereClause = status ? { status } : {};

    const lessonPlans = await LessonPlanAssignment.findAll({
      where: whereClause,
    });

    res.status(200).send(lessonPlans);
  } catch (error) {
    console.error('Error fetching lesson plans:', error.message);
    res.status(500).send({ message: 'An error occurred while fetching lesson plans.' });
  }
};

/**
 * Get a specific lesson plan by ID
 */
exports.getLessonPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const lessonPlan = await LessonPlanAssignment.findByPk(id);
    if (!lessonPlan) {
      return res.status(404).send({ message: 'Lesson plan not found!' });
    }

    res.status(200).send(lessonPlan);
  } catch (error) {
    console.error('Error fetching lesson plan by ID:', error.message);
    res.status(500).send({ message: 'An error occurred while fetching the lesson plan.' });
  }
};
