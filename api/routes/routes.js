const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event.controller')

/* GET home page. */
router.use('/events', eventController)

module.exports = router;
