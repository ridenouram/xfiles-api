const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./routes/queries');

app.use(bodyParser.json());

// app.get('/', db.getNewTransactions);
// app.get('/:userId', db.getNewByUser);

module.exports = app;