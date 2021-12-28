'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.statics.hashPassword = function (passwordClear) {
  return bcrypt.hash(passwordClear, 7);
};

userSchema.methods.comparePassword = function (passwordClear) {
  return bcrypt.compare(passwordClear, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
