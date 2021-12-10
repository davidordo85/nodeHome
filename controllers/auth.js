'use strict';
var express = require('express');
var router = express.Router();

const { User } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid Credentials' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/users (body)
router.post('/register', async (req, res, next) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    const userCreated = await user.save();

    res.status(201).json({ result: userCreated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
