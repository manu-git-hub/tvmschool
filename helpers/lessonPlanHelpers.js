const db = require('../models');
const LessonPlanAssignment = db.lesson_plan_assignment;

/**
 * Generate LP Cycle Number for a specific faculty and academic year.
 * Starts from LP01 and increments up to LP52 for each faculty.
 * Throws an error if all cycles for the year are used for that faculty.
 */
const generateLpCycleNumber = async (facultyId, academicYear) => {
  const lastCycle = await LessonPlanAssignment.findOne({
    where: { faculty_id: facultyId, academic_year: academicYear },
    order: [['lp_cycle_number', 'DESC']],
  });

  if (!lastCycle) return 'LP01'; // Start fresh if no cycles exist for the faculty in the academic year.

  const nextCycle = parseInt(lastCycle.lp_cycle_number.replace('LP', ''), 10) + 1;
  if (nextCycle > 52) {
    throw new Error(`Maximum of 52 lesson plans (LP01 to LP52) can be added for faculty ${facultyId} in the academic year ${academicYear}.`);
  }

  return `LP${String(nextCycle).padStart(2, '0')}`;
};

/**
 * Generate LP Cycle Mapping for the given academic year.
 * Maps LP Cycle Numbers (LP01-LP52) to their week start, week end, and due dates.
 */
const generateLpCycleMapping = (academicYear) => {
  const startDate = new Date(`${academicYear}-01-01`);
  const cycleMappings = {};
  let weekStartDate = new Date(startDate);

  for (let i = 1; i <= 52; i++) {
    const cycleNumber = `LP${String(i).padStart(2, '0')}`;

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    const lpDueDate = new Date(weekEndDate);
    lpDueDate.setDate(weekEndDate.getDate() - 2);

    cycleMappings[cycleNumber] = {
      weekStartDate: weekStartDate.toISOString().split('T')[0],
      weekEndDate: weekEndDate.toISOString().split('T')[0],
      lpDueDate: lpDueDate.toISOString().split('T')[0],
    };

    weekStartDate.setDate(weekStartDate.getDate() + 7);
  }

  return cycleMappings;
};

/**
 * Fetch the LP Due Date for a given academic year and cycle number.
 * Throws an error if no mapping is found.
 */
const calculateLpDueDate = async (academicYear, lpCycleNumber) => {
  const lpCycleMapping = generateLpCycleMapping(academicYear);
  const mapping = lpCycleMapping[lpCycleNumber];
  if (!mapping) throw new Error(`No LP Cycle mapping found for ${lpCycleNumber}`);
  return new Date(mapping.lpDueDate);
};

module.exports = { generateLpCycleNumber, calculateLpDueDate };
