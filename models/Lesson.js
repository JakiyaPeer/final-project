
const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
  recording: { type: String }, // URL to lesson recording
});
module.exports = mongoose.model('Lesson', lessonSchema);