const { pool } = require('../utils/connect');
const Router = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    const { category = 'all', page = 1, perPage = 20 } = req.query;
    
    const limit = +perPage;
    const offset = +perPage * (+page - 1);
    if(category === 'all') {
      pool.query('SELECT * FROM character ORDER BY name LIMIT $1 OFFSET $2;', [limit, offset], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    } else {
      pool.query('SELECT * FROM character WHERE $1 = ANY (categories) ORDER BY name LIMIT $2 OFFSET $3;', [category, limit, offset], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    }
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM character WHERE id = $1 ORDER BY name ', [id], (err, results) => {
      if(err) throw err;
      res.status(200).json(results.rows);
    });
  });
