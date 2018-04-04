// Modules Imports
const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { buildVideoObject, parseTextFromHTML } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../database-utils');
const Video = require('../../models/video');

// Test Suite
describe('Server Test: Create Videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  it('POST /video return 201 code', async () => {
    // Setup
    const videoToCreate = buildVideoObject();
    // Exercise
    const response = await request(app)
      .post('/video')
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
      .post('/video')
      .type('form')
      .send(videoToCreate);
    //const createdVideo = await Video.findOne({title: videoToCreate.title});
    const createdVideo = await Video.findOne(videoToCreate);
    // Verify
    assert.equal(createdVideo.title, videoToCreate.title);
    assert.equal(createdVideo.description, videoToCreate.description);
  });

  it('POST /video response contains video detail', async () => {
    // Setup
    const videoToCreate = buildVideoObject();
    // Exercise
    const response = await request(app)
      .post('/video')
      .type('form')
      .send(videoToCreate);
    // Verify
    assert.include(parseTextFromHTML(response.text, 'h1'), videoToCreate.title);
  });

  it.skip('POST /video cannot submit empty title', async () => {
    // Setup
    const videoToCreate = { videoUrl: 'https://www.youtube.com/embed/XGnDu_NsTss',
                            description: 'Discover the complete workflow of setting up lighting in a nature scene'};
    // Exercise
    const response = await request(app)
      .post('/video')
      .type('form')
      .send(videoToCreate);
    // Verify
    assert.equal(response.text, '');
  });

  it('POST /video returns 400 on empty title', async () => {
    // Setup
    const videoToCreate = { videoUrl: 'https://www.youtube.com/embed/XGnDu_NsTss',
                            description: 'Discover the complete workflow of setting up lighting in a nature scene'};
    // Exercise
    const response = await request(app)
      .post('/video')
      .type('form')
      .send(videoToCreate);
    // Verify
    assert.equal(response.status, 400);
  });

  it('Returns Error Message when submit empty title', async () => {
    // Setup
    const videoToCreate = { videoUrl: 'https://www.youtube.com/embed/XGnDu_NsTss',
                            description: 'Discover the complete workflow of setting up lighting in a nature scene'};
    // Exercise
    const response = await request(app)
      .post('/video')
      .type('form')
      .send(videoToCreate);
    // Verify
    assert.include(parseTextFromHTML(response.text, '.error'), 'Path `title` is required.');
  });

  it('Preserves other fields when submit empty title', async () => {
    // Setup
    const videoToCreate = { videoUrl: 'https://www.youtube.com/embed/XGnDu_NsTss',
                            description: 'Discover the complete workflow of setting up lighting in a nature scene'};
    // Exercise
    const response = await request(app)
      .post('/video')
      .type('form')
      .send(videoToCreate);
    // Verify
    assert.include(parseTextFromHTML(response.text, '#description-input'), videoToCreate.description);
  });

  it('Display a individual video', async () => {
    // Setup
    const videoToCreate = buildVideoObject();
    const video = new Video(videoToCreate);
    await video.save();
    // Exercise
    const response = await request(app)
      .get(`/video/${video._id}`);
    // Verify
    assert.include(parseTextFromHTML(response.text, 'h1'), videoToCreate.title);
  });

});
