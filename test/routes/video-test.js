// Modules Imports
const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { buildVideoObject } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../database-utils');
const Video = require('../../models/video');

// Test Suite
describe('Server Test: Create Videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

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

  it('POST /videos inserts video document in DB', async () => {
    // Setup
    const videoToCreate = buildVideoObject();
    // Exercise
    const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
    //const createdVideo = await Video.findOne({title: videoToCreate.title});
    const createdVideo = await Video.findOne(videoToCreate);
    // Verify
    assert.equal(createdVideo.title, videoToCreate.title);
    assert.equal(createdVideo.description, videoToCreate.description);
  });
});
