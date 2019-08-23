const { scrapeCharacterInfo } = require('./character-page');
const { scrapeNames } = require('./character-names');
const { client } = require('../utils/connect');

const queries = [
  'TXF_characters',
  'TXF_characters?from=Dave+the+Butcher',
  'TXF_characters?from=Jenny+Uphouse',
  'TXF_characters?from=Parker%2C+Lyle%0ALyle+Parker',
  'TXF_characters?from=Yale+Abbott',
  'Monster_of_the_Week'
];

const mainCharacters = [
  'Fox Mulder',
  'Dana Scully',
  'John Doggett',
  'Monica Reyes',
  'Walter Skinner',
  'Cigarette Smoking Man',
  'Deep Throat',
  'The Lone Gunmen',
  'William Scully',
  'X',
  'Samantha Mulder',
  'Cassandra Spender',
  'Jeffrey Spender',
  'Alvin Kersh',
  'Alex Krycek',
  'Marita Covarrubias'
]

async function getNames() {
  return await Promise.all(queries.map(query => {
    let url = 'https://x-files.fandom.com/wiki/Category:' + query;
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

client.connect()
  .then(() => {
    getNames()
      .then(names => {
        return Promise.all(names.map((name) => {
          return scrapeCharacterInfo(name)
            .then(info => {
              if(info.image) {
                const text = 'INSERT INTO character(name, gender, status, born, occupation, rank, affiliations, portrayedBy, image, description, categories) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
                const values = [info.name, info.gender, info.status, info.born, info.occupation, info.rank, info.affiliations, info.portrayedBy, info.image, info.description, info.categories];
                client.query(text, values, (err, res) => {
                  if(err) {
                    console.log('query error', err.stack);
                  }
                });
              }
            })
            .catch(err => console.log('seed error', name));
        }));
      })
      .then(() => {
        return Promise.all(mainCharacters.map(character => {
          client.query(`
          UPDATE character
          SET categories = categories || '{Main Character}'
          WHERE name = $1
          ;`, [character], (err, res) => {
            if(err) console.log('main character error', character, err);
          });
        }));
      })
      .then(() => {
        client.end();
      });
  });

