const app = require('../lib/app');
const request = require('supertest');
const { pool } = require('../lib/utils/connect');

beforeAll(() => {
  pool.connect();
});

afterAll(() => {
  pool.end();
});

describe('routes', () => {
  it('gets all characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body.results).toHaveLength(461);
      });
  });

  it('gets all characters with variable limit', () => {
    return request(app)
      .get('/api/v1/characters?perPage=30')
      .then(res => {
        expect(res.body.results).toHaveLength(30);
        expect(res.body.quantity).toBe(30);
      });
  });

  it('gets all characters with paging', () => {
    return request(app) 
      .get('/api/v1/characters?page=2&perPage=20')
      .then(res => {
        expect(res.body.results).toHaveLength(20);
        expect(res.body.results[0].name).toBe('Anita Budahas');
      });
  });

  it('gets characters by category, and Main characters was successfully added as a category', () => {
    return request(app)
      .get('/api/v1/characters?category=Main_characters')
      .then(res => {
        expect(res.body.quantity).toBe(14);
        expect(res.body.results[0].name).toBe('Alex Krycek');
      });
  });

  it('gets character by name', () => {
    return request(app)
      .get('/api/v1/characters/Dana_Scully')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe('Dana Scully');
      });
  });


  it('gets all characters with variable limit, page, and category', () => {
    return request(app)
      .get('/api/v1/characters?category=Criminals&page=2&perPage=5')
      .then(res => {
        expect(res.body.quantity).toBe(5);
        expect(res.body.results[0].name).toBe('Augustine O\'Fallon');
      });
  });
});
