const express = require('express');
const book = require('./book.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/book', book);

app.listen(3001, function() {
    console.log('Starting server');
});