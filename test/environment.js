const MongodbMemoryServer = require('mongodb-memory-server');
const NodeEnvironment = require('jest-environment-node');

/**
 * Create an environment with a clean mongodb for each test file
 */
class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // eslint-disable-next-line new-cap
    this.mongod = new MongodbMemoryServer.default({
      instance: {
        // settings here
        // dbName is null, so it's random
        // dbName: MONGO_DB_NAME,
      },
      binary: {
        version: '4.0.10',
      },
      autoStart: false,
      // debug: true,
    });
  }

  async setup() {
    await super.setup();
    await this.mongod.start();
    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
    this.mongod = null;
    this.global = {};
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
