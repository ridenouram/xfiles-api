const { pool } = require('../utils/connect');
const Router = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    const { category = 'all' } = req.query;
    if(category === 'all') {
      pool.query('SELECT * FROM character ORDER BY name;', (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    } else {
      pool.query('SELECT * FROM character WHERE $1 = ANY (categories);', [category], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    }
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM character WHERE id = $1;', [id], (err, results) => {
      if(err) throw err;
      res.status(200).json(results.rows);
    });
  });
