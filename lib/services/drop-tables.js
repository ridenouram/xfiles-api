const { client } = require('../utils/connect');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS character;
    `);
    })
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });