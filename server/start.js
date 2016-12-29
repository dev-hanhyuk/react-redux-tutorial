'use strict'
const express = require('express');
const app = express();
const { resolve } = require('path');
const PORT = process.env.PORT || 3000;

app.use(require('volleyball'));
app.use(express.static(resolve(__dirname, '..', 'public')));
app.use(express.static(resolve(__dirname, '..', 'db')));

app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log('App listening on port 3000!')
})