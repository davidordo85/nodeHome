'use strict';
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, token: jwtToken });
      },
    );
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/users (body)
router.post('/register', async (req, res, next) => {
  try {
    const userData = req.body;
    const password = await User.hashPassword(userData.password);
    const data = password;
    const hash = { username: userData.username, password: data };
    const user = new User(hash);
    const userCreated = await user.save();

    res.status(201).json({ result: userCreated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
