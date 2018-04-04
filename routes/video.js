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

router.get('/:id', async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findOne({'_id':videoId});
  console.log("video");
  res.render('videos/show', {video});
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
