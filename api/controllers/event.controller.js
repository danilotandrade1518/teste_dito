const express = require("express")
const router = express.Router()

const eventService = require("../services/event.service")
const eventValidator = require("../validators/event.validator")

router.get("/", async (req, res, next) => {
  const search = req.query.search

  try {
    const [events, eventsCount] = await Promise.all([
      eventService.getEvents(search, req.query.limit, req.skip),
      eventService.countEvents(search)
    ])

    res.json({
      pagination: {
        currentEvents: events.length,
        totalEvents: eventsCount
      },
      events
    })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const event = req.body

  try {
    eventValidator(event)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

  try {
    await eventService.createEvent(event)
  } catch (error) {
    return next(error)
  }

  res.status(201).json(event)
})

module.exports = router
