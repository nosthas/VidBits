const { jsdom } = require('jsdom');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const videoUrl = options.videoUrl || 'https://www.youtube.com/embed/XGnDu_NsTss';
  const title = options.title || 'Lighting and Baking Workflow: Blender Tutorial';
  const description = options.description || 'Discover the complete workflow of setting up lighting in a nature scene';
  return { videoUrl, title,  description };
};


// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildVideoObject,
  parseTextFromHTML
};
