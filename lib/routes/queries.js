const { client } = require('../utils/connect');
const Router = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    const { category = 'all', page = 1, perPage = 461 } = req.query;
    
    const limit = +perPage;
    const offset = +perPage * (+page - 1);
    if(category === 'all') {
      client.query(`
      SELECT
        name,
        gender,
        status,
        born, 
        occupation,
        rank,
        affiliations,
        portrayedBy,
        image,
        description,
        categories  
      FROM character 
      ORDER BY name 
      LIMIT $1 OFFSET $2
      ;
      `, [limit, offset], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    } 
    else {
      const formattedCategory = category.replace(/_/g, ' ');
      client.query(`
      SELECT
        name,
        gender,
        status,
        born, 
        occupation,
        rank,
        affiliations,
        portrayedBy,
        image,
        description,
        categories 
      FROM character 
      WHERE $1 = ANY (categories) 
      ORDER BY name 
      LIMIT $2 OFFSET $3
      ;`, [formattedCategory, limit, offset], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
      });
    }
  })

  .get('/:name', (req, res) => {
    const { name } = req.params;
    const formattedName = name.replace(/_/g, ' ');
    client.query(`
    SELECT
      name,
      gender,
      status,
      born, 
      occupation,
      rank,
      affiliations,
      portrayedBy,
      image,
      description,
      categories 
    FROM character 
    WHERE name = $1
    ;`, [formattedName], (err, results) => {
      if(err) throw err;
      res.status(200).json(results.rows);
    });
  });
