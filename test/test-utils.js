
// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const videoUrl = options.videoUrl || 'https://www.youtube.com/embed/XGnDu_NsTss';
  const title = options.title || 'Lighting and Baking Workflow: Blender Tutorial';
  const description = options.description || 'Discover the complete workflow of setting up lighting in a nature scene';
  return { videoUrl, title,  description };
};

module.exports = {
  buildVideoObject
};
