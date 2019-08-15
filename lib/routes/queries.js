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

const getCharacterByName = (req, res) => {
  const { name } = req.params;
  pool.query('SELECT * FROM character WHERE name LIKE $1;', [name], (err, results) => {
    if(err) throw err;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharacterByName
};