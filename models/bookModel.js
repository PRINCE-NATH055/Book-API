const db = require('../db');

// CREATE
async function addBook(book) {
  const [result] = await db.execute(
    'INSERT INTO books (title, author, year) VALUES (?, ?, ?)',
    [book.title, book.author, book.year]
  );
  return result;
}

// READ
async function getBooks() {
  const [rows] = await db.execute('SELECT * FROM books');
  return rows;
}

// UPDATE
async function updateBook(id, book) {
  const [result] = await db.execute(
    'UPDATE books SET title=?, author=?, year=? WHERE id=?',
    [book.title, book.author, book.year, id]
  );
  return result;
}

// DELETE
async function deleteBook(id) {
  const [result] = await db.execute('DELETE FROM books WHERE id=?', [id]);
  return result;
}

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook
};
