// Import Modules
const router = require('express').Router();
const Video = require('../models/video');

// Define Express router
router.post('/', async (req, res, next) => {

  const { videoUrl, title, description } = req.body;
  const newVideo = new Video({ videoUrl, title, description });

  newVideo.validateSync();

  if (newVideo.errors) {
    res.status(400).render('error', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.status(201);
    res.send({success:"ok"})
    //res.redirect('/');
  }
});

// Export Module
module.exports = router;
