const { assert } = require('chai');
const { buildVideoObject } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../database-utils');
const Video = require('../../models/video');

// Test Suite
describe('Model Test: Videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  it('model has a title String', async () => {
    // Setup
    const videoToCreate = buildVideoObject({title: 1});
    // Exercise
    const newVideo = new Video(videoToCreate);
    // Verify
    assert.strictEqual(newVideo.title, videoToCreate.title.toString());
  });
});
