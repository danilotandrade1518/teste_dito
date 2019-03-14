const from = require('rxjs').from
const groupBy = require('rxjs/operators').groupBy
const map = require('rxjs/operators').map
const mergeMap = require('rxjs/operators').mergeMap
const toArray = require('rxjs/operators').toArray

const https = require("https")

const options = {
  host: 'storage.googleapis.com',
  port: 443,
  path: '/dito-questions/events.json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

module.exports = {
  getEvents: function(onResult) {
    const req = https.request(options, res => {
      var output = ""
      res.setEncoding("utf8")

      res.on("data", function(chunk) {
        output += chunk
      })

      res.on("end", function() {
        var obj = JSON.parse(output)
        onResult(res.statusCode, obj)
      })
    })

    req.on("error", function(err) {
      onResult(400, err.message)
    })

    req.end()
  },
  convertEvents: function(events) {
    const addTransactionId = event => {
      event['transaction_id'] = event.custom_data.filter(data => data.key === 'transaction_id').map(data => data.value)[0]
      return event
    }

    const convertEvent = event => {
      const eventComprou = event.filter(event => event.event==='comprou')[0]
      const eventsComprouProduto = event.filter(event => event.event==='comprou-produto')

      const newEvent = {
        "timestamp": eventComprou.timestamp,
        "revenue": eventComprou.revenue,
        "transaction_id": eventComprou.transaction_id,
        "store_name": eventComprou.custom_data.filter(data => data.key === 'store_name').map(data => data.value)[0],
        "products": eventsComprouProduto.map(eventComprouProduto => {
          return {
            "name": eventComprouProduto.custom_data.filter(data => data.key === 'product_name').map(data => data.value)[0],
            "price": eventComprouProduto.custom_data.filter(data => data.key === 'product_price').map(data => data.value)[0],
          }
        })
      }

      return newEvent
    }

    const compareEvent = (a, b) => {
      if (new Date(a.timestamp) < new Date(b.timestamp)){
        return 1
      }
      if (new Date(a.timestamp) < new Date(b.timestamp)){
        return -1
      }
      
      return 0
    }

    return from(events).pipe(
      map(addTransactionId),
      groupBy(event => event.transaction_id),
      mergeMap(group => group.pipe(toArray())),
      map(convertEvent),
      toArray(),
      map(events => events.sort(compareEvent))
    )
  }
}
