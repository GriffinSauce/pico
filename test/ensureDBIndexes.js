const mongoose = require('../functions/lib/mongoose');

// Ensure indexes match those in schema
module.exports = () =>
  Promise.all(
    mongoose.modelNames().map(name => mongoose.model(name).syncIndexes()),
  );
