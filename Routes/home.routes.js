const express = require('express');
const { home } = require('../Controllers/home.controller');

const index = express.Router();

index.get('/', home);

module.exports.index = index;
