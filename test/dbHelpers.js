/* eslint-env jest */
const mongoose = require('mongoose');
const ensureDBIndexes = require('./ensureDBIndexes');

/**
 * Helpers for tests that use the database
 *
 * @example
 * const {
 *   connectDb,
 *   clearDb,
 *   disconnectDb,
 * } = require('../test/dbHelpers');
 * beforeAll(connectDb);
 * beforeEach(clearDb);
 * afterAll(disconnectDb);
 */

module.exports.connectDb = async function() {
  jest.setTimeout(20000);
  const client = mongoose.connect(global.__MONGO_URI__, {
    autoIndex: false,
    autoReconnect: false,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: global.__MONGO_DB_NAME__,
  });
  await ensureDBIndexes();
  return client;
};

module.exports.getDb = function() {
  return mongoose.connection.db;
};

module.exports.clearDb = async function() {
  await mongoose.connection.db.dropDatabase();
  await ensureDBIndexes();
};

module.exports.disconnectDb = async function() {
  // via https://stackoverflow.com/a/51455290/2747869
  // Wait until indexes are created or you'll frequently get topology-destroyed errors
  await Promise.all(
    mongoose.modelNames().map(model => mongoose.model(model).createIndexes()),
  );

  await mongoose.disconnect();
  mongoose.connections.forEach(connection => {
    mongoose.modelNames().forEach(modelName => {
      delete connection.models[modelName]; // eslint-disable-line no-param-reassign
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach(collectionName => {
      delete connection.collections[collectionName]; // eslint-disable-line no-param-reassign
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach(modelSchemaName => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
};
