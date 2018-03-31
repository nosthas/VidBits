// Import Modules
const router = require('express').Router();

// Define Express router
router.post('/', (req, res, next) => {
  res.status(201);
  res.send({success:"ok"})
});

// Export Module
module.exports = router;
