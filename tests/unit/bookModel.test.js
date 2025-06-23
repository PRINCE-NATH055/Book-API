const bookModel = require('../../models/bookModel');
const db = require('../../db');

beforeAll(async () => {
  await db.execute('DELETE FROM books');
});

describe('Unit: Book Model', () => {
  let bookId;

  test('addBook() adds a book', async () => {
    const result = await bookModel.addBook({ title: 'Unit Book', author: 'Author', year: 2023 });
    expect(result.insertId).toBeGreaterThan(0);
    bookId = result.insertId;
  });

  test('getBooks() returns books', async () => {
    const books = await bookModel.getBooks();
    expect(books.length).toBeGreaterThan(0);
  });

  test('updateBook() modifies a book', async () => {
    await bookModel.updateBook(bookId, { title: 'Updated', author: 'Updated', year: 2024 });
    const books = await bookModel.getBooks();
    expect(books.find(b => b.id === bookId).title).toBe('Updated');
  });

  test('deleteBook() removes the book', async () => {
    await bookModel.deleteBook(bookId);
    const books = await bookModel.getBooks();
    expect(books.find(b => b.id === bookId)).toBeUndefined();
  });
});


afterAll(async () => {
  await db.end();
});
