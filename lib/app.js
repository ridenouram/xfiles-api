const express = require('express');
const app = express();
const db = require('./routes/queries');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1/characters', db);

app.use(express.static('/Public'));
app.use('/', (req, res, next) => {
  res.sendFile('/Public/index.html');
  next();
});

module.exports = app;
