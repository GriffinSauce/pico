const mongoose = require('mongoose');

const db = mongoose.connection;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

console.info(`Connecting with user ${user}`);

mongoose.connect(
  `mongodb+srv://${user}:${password}@photo-request-bdwz4.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

db.on('error', error => {
  console.error('connection error:', error);
});

db.once('open', error => {
  if (process.env.NODE_ENV !== 'test') console.info('mongoose connected!');
});

module.exports = mongoose;
