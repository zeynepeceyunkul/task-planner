const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET - Tüm kategorileri getir
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Kategoriler alınamadı.' });
  }
});

// POST - Yeni kategori ekle
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Kategori eklenemedi.' });
  }
});

// DELETE - Kategori sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    res.json({ message: 'Kategori silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Kategori silinemedi.' });
  }
});

module.exports = router;
