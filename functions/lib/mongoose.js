const mongoose = require('mongoose');

const db = mongoose.connection;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

mongoose.connect(
  `mongodb+srv://${user}:${password}@photo-request-bdwz4.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

db.on('error', error => {
  console.error('connection error:', error);
});

db.once('open', error => {
  console.info('mongoose connected!');
});

module.exports = mongoose;
