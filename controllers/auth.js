'use strict';
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user =
      (await User.findOne({ username })) || (await User.findOne({ email }));

    console.log(user);
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
    const { email, username, password } = req.body;
    const forDuplicatedEmail = await User.findOne({ email });
    if (forDuplicatedEmail) {
      res
        .status(401)
        .json({ success: false, message: 'This email is already registered ' });
      return;
    }
    const forDuplicatedUsername = await User.findOne({ username });
    if (forDuplicatedUsername) {
      res.status(401).json({ success: false, message: 'Duplicated username' });
      return;
    }

    if (username.length < 6) {
      res.status(401).json({
        success: false,
        message: 'Username must be at least six characters long',
      });
      return;
    }
    if (password.length < 6) {
      res.status(401).json({
        success: false,
        message: 'Password must be at least six characters long',
      });
      return;
    }
    const passwordHash = await User.hashPassword(password);
    const data = passwordHash;
    const hash = { email: email, username: username, password: data };

    const user = new User(hash);
    const userCreated = await user.save();

    res.status(201).json({ result: userCreated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
