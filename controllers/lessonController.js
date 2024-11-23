const Lesson = require('../models/Lesson');

const createLesson = async (req, res) => {
  const { tutorId, subject, date } = req.body;
  try {
    const lesson = await Lesson.create({ studentId: req.user.id, tutorId, subject, date });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ studentId: req.user.id }).populate('tutorId', 'name');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLesson, getLessons };
