'use strict';

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
