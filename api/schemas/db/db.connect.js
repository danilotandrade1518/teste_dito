const mongoose = require('mongoose')
const env = require('../../env/env')
let db

module.exports = function() {
    const options = {
        useNewUrlParser: true,
        keepAlive: 120
    }

    if (!db) {
      db = mongoose.connect(env.DB_URL, options)
    }

    return db
}
