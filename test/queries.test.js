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
        expect(res.body).toHaveLength(20);
      });
  });

  it('gets all characters with variable limit', () => {
    pool.connect();
    return request(app)
      .get('/api/v1/characters?perPage=30')
      .then(res => {
        expect(res.body).toHaveLength(30);
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
        expect(res.body).toHaveLength(20);
      });
  });

  it('gets all characters with variable limit, page, and category', () => {
    pool.connect();
    return request(app)
      .get('/api/v1/characters?category=Criminals&page=2&perPage=5')
      .then(res => {
        expect(res.body).toHaveLength(5);
        expect(res.body[0].id).toEqual(261);
      });
  });
});
