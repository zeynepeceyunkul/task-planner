const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

// Kullanıcının görevlerini getir
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// Görev oluştur (kullanıcıya ait)
router.post('/', auth, async (req, res) => {
  const newTask = new Task({ ...req.body, user: req.userId });
  const saved = await newTask.save();
  res.json(saved);
});

// Görev güncelle
router.put('/:id', auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Görev sil
router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Silindi' });
});

module.exports = router;
