const db = require('../../db');
const bookModel = require('../../models/bookModel');

jest.mock('../../db');

describe('Unit (Mocked): Book Model', () => {
  test('addBook() returns mocked insertId', async () => {
    const mockInsertResult = [{ insertId: 999 }];
    db.execute.mockResolvedValue(mockInsertResult);

    const result = await bookModel.addBook({
      title: 'Mocked Book',
      author: 'Mock Author',
      year: 2022
    });

    expect(result.insertId).toBe(999);
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO books (title, author, year) VALUES (?, ?, ?)',
      ['Mocked Book', 'Mock Author', 2022]
    );
  });
});
