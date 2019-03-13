const eventService = require("./services/event.service")
const mongoose = require("mongoose")

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/dito', {
        useNewUrlParser: true,
        keepAlive: 120
    })
}

const events = [
    { event: 'buy', size: 10000 },
    { event: 'finalized', size: 10000 },
    { event: 'pay', size: 10000 },
]

async function createEvent(event) {
    await eventService.createEvent(event)
}

async function populateDB() {
    console.log('Populando...')

    await events.forEach(event => {
        for(let i = 0; i < event.size; i++){
            createEvent(event)
        }
    })
}

connect(),
populateDB()

setTimeout(() => {
    console.log('Populado com sucesso!')
    process.exit()
}, 10000)