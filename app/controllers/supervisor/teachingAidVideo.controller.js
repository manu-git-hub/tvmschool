const db = require('../../models');
const TeachingAidVideo = db.teachingAidVideo;

// POST: Add multiple video links
exports.addTeachingAidVideos = async (req, res) => {
  try {
    const { teacherId, videoLinks } = req.body;

    if (!teacherId || !Array.isArray(videoLinks)) {
      return res.status(400).send({ message: 'Teacher ID and video links are required.' });
    }

    const lastEntry = await TeachingAidVideo.findOne({ order: [['id', 'DESC']] });
    let nextId = lastEntry ? lastEntry.id + 1 : 1;

    const data = videoLinks.map((link) => ({
      id: nextId++,
      teacherId,
      videoLink: link,
    }));

    const newEntries = await TeachingAidVideo.bulkCreate(data);

    res.status(200).send({
      message: 'Teaching Aid videos added successfully!',
      data: newEntries,
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        message: 'Teacher not found. Please provide a valid teacher ID.',
      });
    }

    res.status(500).send({ message: 'Error adding video links.', error: error.message });
  }
};

// GET: Retrieve video links for a specific teacher
exports.getTeachingAidVideos = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const entries = await TeachingAidVideo.findAll({ where: { teacherId } });

    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching video links.', error: error.message });
  }
};
