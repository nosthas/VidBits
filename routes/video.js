// Import Modules
const router = require('express').Router();
const Video = require('../models/video');

// Define Router Routes
router.get('/', async (req, res, next) => {
  const videos = await Video.find();
  res.render('videos/index', {videos})
});

router.get('/add', (req, res, next) => {
  res.render('videos/create');
});

router.post('/', async (req, res, next) => {

  const { videoUrl, title, description } = req.body;
  const video = new Video({ videoUrl, title, description });
  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/create', {video: video});
    //res.send("");

  } else {
    await video.save();
    res.status(201);
    res.render('videos/show', {video});
  }
});

// Export Module
module.exports = router;
