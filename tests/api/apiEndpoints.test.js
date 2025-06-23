const express = require('express');
const bookRoutes = require('../../routes/bookRoutes');
const request = require('supertest');

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

describe('API: Endpoint Structure', () => {
  test('GET /api/books returns 200', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/books with invalid data returns 500', async () => {
    const res = await request(app).post('/api/books').send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});


