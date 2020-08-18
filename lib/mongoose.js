const mongoose = require('mongoose');

const db = mongoose.connection;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

if (!user) throw new Error('MONGO_USER is missing');
if (!password) throw new Error('MONGO_PASSWORD is missing');

mongoose.connect(
  `mongodb+srv://${user}:${password}@photo-request-bdwz4.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

db.on('error', (error) => {
  console.error('connection error:', error); // eslint-disable-line no-console
});

db.once('open', () => {
  if (process.env.NODE_ENV !== 'test') console.info('mongoose connected!'); // eslint-disable-line no-console
});

module.exports = mongoose;
