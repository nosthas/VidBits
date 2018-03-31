const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('Feature: Create Page', () => {
  describe('GET "/create.html"', () => {

    it('Add a new Video', () => {
      // Setup
      const videoToCreate = buildVideoObject();
      // Exercise
      browser.url('/create.html');
      browser.setValue('#videoUrl-input', videoToCreate.videoUrl);
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#description-input', videoToCreate.description);
      browser.click('#submit-button');
      // Verify
      assert.include(browser.getText('body'), videoToCreate.title);
      assert.include(browser.getAttribute('body img', 'src'), videoToCreate.videoUrl);
    });

  });
});
