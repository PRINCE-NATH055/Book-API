const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModel');

router.post('/', async (req, res) => {
  try {
    const result = await bookModel.addBook(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const books = await bookModel.getBooks();
  res.json(books);
});

router.put('/:id', async (req, res) => {
  await bookModel.updateBook(req.params.id, req.body);
  res.json({ message: 'Book updated' });
});

router.delete('/:id', async (req, res) => {
  await bookModel.deleteBook(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
