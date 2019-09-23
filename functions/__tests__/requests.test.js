/* eslint-env jest */
const requests = require('../requests');
const { connectDb, clearDb, disconnectDb } = require('../../test/dbHelpers');

beforeAll(connectDb);
beforeEach(clearDb);
afterAll(disconnectDb);

describe('handler', () => {
  it('should return 404 - GET', async () => {
    const res = await requests.handler({
      httpMethod: 'GET',
      path: '/this/path/does/not/exist',
    });
    expect(res.statusCode).toBe(404);
  });
});
