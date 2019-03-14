const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event.controller')
const timelineController = require('../controllers/timeline.controller')

/* GET home page. */
router.use('/events', eventController)
router.use('/timeline', timelineController)

module.exports = router;
