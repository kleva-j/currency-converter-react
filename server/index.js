const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

dotenv.config();
const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(express.static(path.resolve(__dirname, '..', './dist/')));

app.get('/currencies', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './currencies.json'))
});

app.get('/countries', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './countries.json'))
});

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', './dist/index.html'));
});

const PORT = process.env.PORT || 5000;

const { log } = console;

app.listen(PORT, () => {
  log('Server started on port: ', PORT);
});
