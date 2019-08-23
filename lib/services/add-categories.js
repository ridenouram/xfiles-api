const { client } = require('../utils/connect');

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

client.connect()
  .then(() => {
    return Promise.all(mainCharacters.map(character => {
      console.log(character);
      client.query(`
        UPDATE character
        SET categories = categories || '{Main character}'
        WHERE name = $1
      ;`, [character], (err, res) => {
        if(err) console.log('main character error', character, err);
      });
    }));
  });

