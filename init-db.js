'use strict';

require('dotenv').config();

const { mongoose, connectMongoose, User } = require('./models');

main().catch(err => console.error(err));

async function main() {
  await initUsers();

  mongoose.connection.close();
}

async function initUsers() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Deleted ${deletedCount} users.`);

  const result = await User.insertMany({
    email: 'admin@gmail.com',
    password: await User.hashPassword('123456'),
  });
  console.log(`Insert ${result.length} user${result.length > 1 ? 's' : ''}.`);
}
