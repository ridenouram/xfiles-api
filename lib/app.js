const express = require('express');
const app = express();
const db = require('./routes/queries');
const cors = require('cors');
const { client } = require('./utils/connect');

app.use(express.json());
app.use(cors());

client.connect();

app.use('/api/v1/characters', db);

app.use(express.static(__dirname + '/Public'));
app.use('/', (req, res, next) => {
  res.sendFile(__dirname + '/Public/index.html');
  next();
});

module.exports = app;
