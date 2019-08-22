const { pool } = require('../lib/utils/connect');
const app = require('../lib/app');
const request = require('supertest');

afterAll(() => {
  pool.end().then(() => console.log('pool has ended'));
});

describe('routes', () => {
  it('gets all characters', () => {
    pool.connect();
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body).toHaveLength(465);
      });
  });

  it('gets character by id', () => {
    pool.connect();
    return request(app)
      .get('/api/v1/characters/207')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets characters by category', () => {
    pool.connect();
    return request(app)
      .get('/api/v1/characters?category=Criminals')
      .then(res => {
        expect(res.body).toHaveLength(70);
      });
  });
});
