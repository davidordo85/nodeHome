'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('connection error', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Connected to MongoDB en ${mongoose.connection.name}`,
  );
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
