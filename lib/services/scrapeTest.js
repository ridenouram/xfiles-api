const { scrapeCharacterInfo } = require('./character-page');
const { pool } = require('../utils/connect');

const testScrape = async(poolOpen = false) => {
  return await scrapeCharacterInfo('https://x-files.fandom.com/wiki/Flukeman')
    .then(info => {
      if(info.image) {
        const text = 'INSERT INTO character(name, gender, status, born, occupation, rank, affliations, portrayedBy, image, description, categories) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [info.name, info.gender, info.status, info.born, info.occupation, info.rank, info.affiliations, info.portrayedBy, info.image, info.description, info.categories];
        pool.query(text, values, (err, res) => {
          if(err) {
            console.log('error', err.stack);
          } else {
            console.log('success', res);
          }
        });
      }
    });
};

testScrape();

