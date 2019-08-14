const { scrapeCharacterInfo } = require('./character-page');
const { scrapeNames } = require('./character-names');
const { pool } = require('../utils/connect');

const queries = [
  '',
  '?from=Dave+the+Butcher',
  '?from=Jenny+Uphouse',
  '?from=Parker%2C+Lyle%0ALyle+Parker',
  '?from=Yale+Abbott'
];

async function getNames() {
  return await Promise.all(queries.map(query => {
    let url = 'https://x-files.fandom.com/wiki/Category:TXF_characters' + query;
    const arr = scrapeNames(url);
    return arr;
  }))
    .then(arr => {
      let names = [];
      for(let i = 0; i < arr.length; i++) {
        names = [...names, ...arr[i]];
      }
      return names;
    });
}

getNames()
  .then(names => {
    return Promise.all(names.map(name => {
      let url = 'https://x-files.fandom.com/wiki/' + name;
      return scrapeCharacterInfo(url)
        .then(info => {
          if(info.image) {
            const text = 'INSERT INTO character(name, gender, status, born, occupation, rank, affiliations, portrayedBy, image, description, categories) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const values = [info.name, info.gender, info.status, info.born, info.occupation, info.rank, info.affiliations, info.portrayedBy, info.image, info.description, info.categories];
            pool.query(text, values, (err, res) => {
              if(err) {
                console.log('query error', err.stack);
              }
            });
          }
        })
        .catch(err => console.log('seed error', name));
    }));
  });

