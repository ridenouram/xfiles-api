const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/queries');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/v1/characters', db.getAllCharacters);
app.get('/characters/:id', db.getCharacterById);
app.get('/characters', db.getCharactersByCategory);

module.exports = app;
