const express = require('express');
const app = express();
const db = require('./routes/queries');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1/characters', db);

module.exports = app;
