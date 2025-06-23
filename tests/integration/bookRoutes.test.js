const express = require('express');
const bookRoutes = require('../../routes/bookRoutes');
const db = require('../../db');
const request = require('supertest');

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

beforeAll(async () => {
  await db.execute('DELETE FROM books');
});

describe('Integration: Book API', () => {
  let bookId;

  test('POST /api/books - should create a book', async () => {
    const res = await request(app).post('/api/books').send({
      title: 'Integration Book',
      author: 'Integration Tester',
      year: 2023
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    bookId = res.body.id;
  });

  test('GET /api/books - should return books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /api/books/:id - should update the book', async () => {
    const res = await request(app).put(`/api/books/${bookId}`).send({
      title: 'Updated Integration Book',
      author: 'New Author',
      year: 2024
    });
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /api/books/:id - should delete the book', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await db.end();
});
