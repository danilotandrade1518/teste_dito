const mongoose = require('mongoose')
const eventSchema = require('../schemas/event.schema')

const EventModel = mongoose.model('Event', eventSchema)

module.exports = {
    getEvents: function (search, limit, skip) {
      return EventModel.find(
          {event: { $regex: '.*' + search + '.*' } },
          '-_id event timestamp',
        )
        .limit(limit)
        .skip(skip)
        .lean()
        .sort({timestamp: 'desc'})
        .exec()
    },
    countEvents: function (search) {
      return EventModel.countDocuments({event: { $regex: '.*' + search + '.*' } })
    },
    createEvent: function (obj) {
      var event = new EventModel({ event: obj.event })

      return event.save()
    }
}
