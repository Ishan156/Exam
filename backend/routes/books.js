const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST /api/books -> Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, stock = 0, publishedYear } = req.body;
    const book = new Book({ title, author, genre, price, stock, publishedYear });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/books -> Get all books
router.get('/', async (req, res) => {
  try {
    // Support optional query filtering by search, genre, author
    const { q, genre, author } = req.query;
    const filter = {};
    if (q) {
      // simple case-insensitive partial match on title or author
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ];
    }
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/books/:id -> Update book
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/books/:id -> Delete book
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Book.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted', id: removed._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
