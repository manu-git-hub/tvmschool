const db = require('../../models');
const PhysicalActivity = db.physicalActivity;
const TeacherPhysicalActivity = db.teacherPhysicalActivity;

// GET: Retrieve all predefined physical activities
exports.getPhysicalActivities = async (req, res) => {
  try {
    const activities = await PhysicalActivity.findAll({
      attributes: ['id', 'description'], // Fetch only ID and description
    });
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Physical Activities.', error: error.message });
  }
};

// POST: Assign physical activities to a teacher (max 4)
exports.assignTeacherActivities = async (req, res) => {
  try {
    const { teacherId, activityIds } = req.body;

    if (!teacherId || !Array.isArray(activityIds) || activityIds.length === 0) {
      return res.status(400).send({ message: 'Teacher ID and activity IDs are required.' });
    }

    if (activityIds.length > 4) {
      return res.status(400).send({ message: 'A teacher can select a maximum of 4 activities.' });
    }

    // Check if teacherId exists in the users table
    const teacherExists = await db.user.findByPk(teacherId);
    if (!teacherExists) {
      return res.status(400).send({
        message: `Teacher with ID '${teacherId}' does not exist.`,
      });
    }

    // Check if the selected activities exist
    const existingActivities = await PhysicalActivity.findAll({
      where: { id: activityIds },
    });

    if (existingActivities.length !== activityIds.length) {
      return res.status(400).send({ message: 'One or more selected activities do not exist.' });
    }

    // Remove existing activities for the teacher
    await TeacherPhysicalActivity.destroy({ where: { teacherId } });

    // Calculate the next ID
    const lastEntry = await TeacherPhysicalActivity.findOne({
      order: [['id', 'DESC']],
    });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    // Add new activities for the teacher
    const data = activityIds.map((activityId) => ({
      id: nextId++,
      teacherId,
      activityId,
    }));

    const assignedActivities = await TeacherPhysicalActivity.bulkCreate(data);

    res.status(200).send({ message: 'Activities assigned to teacher successfully!', data: assignedActivities });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error assigning activities to teacher.', error: error.message });
  }
};

// GET: Retrieve assigned physical activities for a teacher
exports.getTeacherActivities = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacherActivities = await TeacherPhysicalActivity.findAll({
      where: { teacherId },
      include: [
        {
          model: PhysicalActivity,
          attributes: ['id', 'description'], // Only ID and description
        },
      ],
    });

    res.status(200).send(teacherActivities);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching teacher activities.', error: error.message });
  }
};
