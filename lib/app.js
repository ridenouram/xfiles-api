const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/queries');

app.use(bodyParser.json());

app.get('/', db.getAllCharacters);
app.get('/character/:id', db.getCharacterById);
app.get('/category/:category', db.getCharactersByCategory);

module.exports = app;