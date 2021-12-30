'use strict';
var express = require('express');
var router = express.Router();
const jwtAuth = require('../lib/jwtAuth');
const { Message } = require('../models');

router.get('/', async (req, res, next) => {
  res.json({ message: 'hola que ase' });
  return;
});

router.post('/newMessage', jwtAuth, async (req, res, next) => {
  try {
    const { message } = req.body;
    res.json({ message: 'nuevo mensaje' });
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
