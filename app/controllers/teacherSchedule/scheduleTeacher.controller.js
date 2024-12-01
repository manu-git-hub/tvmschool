const db = require('../../models');
const ScheduleTeacher = db.scheduleTeacher;
const User = db.user;

exports.assignTeacher = async (req, res) => {
  try {
    const { teacherId, schedules } = req.body;

    // Validate teacherId
    const teacher = await User.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found.' });
    }

    if (!schedules || !Array.isArray(schedules)) {
      return res.status(400).send({ message: 'Invalid schedules data.' });
    }

    // Insert schedules
    const createdSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const { standardId, subjectId, divisionId } = schedule;
        return ScheduleTeacher.create({
          teacherId,
          standardId,
          subjectId,
          divisionId,
        });
      })
    );

    res.status(200).send({
      message: 'Schedules created successfully!',
      data: createdSchedules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error assigning schedules.' });
  }
};

exports.getTeacherSchedules = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Validate teacherId
    const teacher = await User.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found.' });
    }

    // Fetch schedules
    const schedules = await ScheduleTeacher.findAll({
      where: { teacherId },
      include: [
        { model: db.standard, attributes: ['name'] },
        { model: db.subject, attributes: ['name'] },
        { model: db.division, attributes: ['name'] },
      ],
    });

    res.status(200).send(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching schedules.' });
  }
};
