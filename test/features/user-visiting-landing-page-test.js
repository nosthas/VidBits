const {assert} = require('chai');

describe('Feature: Landing Page', () => {
  describe('GET "/"', () => {

    it('Show no videos', () => {
      // Setup
      // Exercise
      browser.url('/');
      // Verify
      assert.equal(browser.getText('#videos-container'), '');
    });

    it('Links to a creation page', () => {
      // Setup
      // Exercise
      browser.url('/');
      browser.click('a[href="./create.html"]');
      // Verify
      assert.include(browser.getText('body'), 'Save a video');
    });

  });
});
