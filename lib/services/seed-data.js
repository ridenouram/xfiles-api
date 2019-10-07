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
];

//Uses scrapeNames for all pages of character lists, reduces into one array of all names
function getNames() {
  return Promise.all(queries.map(query => scrapeNames('https://x-files.fandom.com/wiki/Category:' + query)))
    .then(arr => arr.reduce((names, queryResult) => [...names, ...queryResult], []));
}

//Scrapes all character info, saves those with images into database
function seedCharacters(names) {
  return Promise.all(names.map(name => {
    return scrapeCharacterInfo(name)
      .then(info => {
        if(info.image) {
          return client.query(`
          INSERT INTO character(name, gender, status, born, occupation, rank, affiliations, portrayedBy, image, description, categories)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [info.name, info.gender, info.status, info.born, info.occupation, info.rank, info.affiliations, info.portrayedBy, info.image, info.description, info.categories], 
          err => {
            if(err) console.log(err.stack);
          });
        }
      })
      .catch(() => console.log('seed error', name));
  }));
}

//Manually adds main character category to chosen characters
function addCategory(category, characters) {
  const formattedCategory = `{${category}}`;
  return Promise.all(characters.map(character => {
    return client.query(`
      UPDATE character
      SET categories = categories || $2
      WHERE name = $1
    ;`, [character, formattedCategory],
    err => {
      if(err) console.log(err.stack);
    });
  }));
}

client.connect()
  .then(() =>  getNames())
  .then(names => seedCharacters(names))
  .then(() => addCategory('Main characters', mainCharacters))
  .finally(() => client.end())
  .catch(err => console.log(err));
  


