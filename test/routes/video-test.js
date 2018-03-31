// Modules Imports
const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { buildVideoObject } = require('../test-utils');

// Test Suite
describe('Server Test: Create Videos', () => {
  it('POST /videos return 201 code', async () => {
    // Setup
    const videoToCreate = buildVideoObject();
    // Exercise
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
    // Verify
      assert.equal(response.status, 201);
  });
});
