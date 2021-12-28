'use strict';
var express = require('express');
var router = express.Router();

const { Message } = require('../models');

router.get('/chat', async (req, res, next) => {
  res.json({ message: 'hola que ase' });
  return;
});

router.post('/newMessage', async (req, res, next) => {
  res.json({ message: 'Estoy creando un mensaje' });
});

module.exports = router;
