const { client } = require('../utils/connect');

client.connect()
  .then(() => {
    return client.query(`
        CREATE TABLE character (
          id SERIAL UNIQUE,
          name TEXT UNIQUE,
          gender TEXT,
          status TEXT,
          born TEXT, 
          occupation TEXT,
          RANK TEXT,
          affiliations TEXT,
          portrayedBy TEXT,
          image TEXT,
          description TEXT,
          categories TEXT[],
          PRIMARY KEY (id)
        );`
    )
      .then(
        () => console.log('create tables complete'),
        err => console.log(err)
      )
      .then(() => {
        client.end();
      });
  });
  
