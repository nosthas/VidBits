const {assert} = require('chai');

describe('Feature: Landing Page', () => {
  describe('with no existing videos', () => {
    it('show no videos', () => {
      // Setup

      // Exercise
      browser.url('/');

      // Verify
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
});
