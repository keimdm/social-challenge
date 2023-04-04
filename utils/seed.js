const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [
    {
        username: "Test One",
        email: "test1@test.com"
    },
    {
        username: "Test Two",
        email: "test2@test.com"
    },
    {
        username: "Test Three",
        email: "test3@test.com"
    },
  ];

  const thoughts = [
    {
        thoughtText: "Hello World!!!!!!!!!!!!!!!!",
        username: "Test One"
    },
    {
        thoughtText: "Hello World!!!!!!!!!!!!!!!!",
        username: "Test Two"
    },
    {
        thoughtText: "Hello World!!!!!!!!!!!!!!!!",
        username: "Test Three"
    },
  ];

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});