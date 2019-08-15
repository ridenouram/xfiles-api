const { pool } = require('../utils/connect');

const getAllCharacters = (req, res) => {
  pool.query('SELECT * FROM character ORDER BY name;', (err, results) => {
    if(err) throw err;
    res.status(200).json(results.rows);
  });
};

const getCharacterById = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM character WHERE id = $1;', [id], (err, results) => {
    if(err) throw err;
    res.status(200).json(results.rows);
  });
};

const getCharactersByCategory = (req, res) => {
  const { category } = req.params;
  pool.query('SELECT * FROM character WHERE $1 = ANY (categories);', [category], (err, results) => {
    if(err) throw err;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharactersByCategory
};