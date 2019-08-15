const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/queries');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', db.getAllCharacters);
app.get('/characters/:id', db.getCharacterById);
app.get('/category/:category', db.getCharactersByCategory);

module.exports = app;
