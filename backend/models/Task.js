const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  dueDate: String,
  category: String,
  description: { type: String, default: '' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);
