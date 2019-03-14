const express = require("express")
const router = express.Router()

const timelineService = require("../services/timeline.service")

router.get("/", (req, res, next) => {
  timelineService.getEvents( (statusCode, result) => {
    if(statusCode === '400'){
      return res.status(400).send()
    }

    timelineService.convertEvents(result.events).subscribe(
      events => {
        const timeline = {'timeline': events}
        res.json(timeline)
      }
    )
  })
})

module.exports = router
