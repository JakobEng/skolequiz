"use strict"
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

let app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(bodyParser.json())

io.on('connection', socket => {
  console.log('a user connected')
  fs.readFile('./data/mode.json', 'utf8', function(err, database) {
    if(err) {
      return res.json({"error": "error geting data from database"})
    }

    socket.emit('update mode', JSON.parse(database))
  })

  fs.readFile('./data/politik.json', 'utf8', function(err, database) {
    if(err) {
      return res.json({"error": "error geting data from database"})
    }

    socket.emit('update politik', JSON.parse(database))
  })

  socket.on('post mode', (body) => {
    thing(body, 'mode')
  })

  socket.on('post politik', (body) => {
    thing(body, 'politik')
  })
})

;(function repeat() {
  setTimeout(() => {
    repeat()
  }, 1000)
  fs.readFile('./data/timer.json', 'utf8', (err,timer) => {
    if(err) throw err

    timer = JSON.parse(timer)

    io.emit('timer', timer.time)

    if(timer.start && timer.time > 0) {
      timer.time -= 1
      fs.writeFile('./data/timer.json', JSON.stringify(timer,null,2), 'utf8', err => {
        if(err) throw err
      })
    }
  })
})()

function thing(body, file) {
  new Promise((resolve,reject) => {
    body = JSON.parse(body)

    let gender = body.gender
    let age = body.age
    let answers = body.answers
    let onlyBool;

    try {
      answers.forEach((answer) => {if(typeof answer !== 'boolean') onlyBool = false})
      if(typeof onlyBool === 'undefined') {onlyBool = true}
    } catch(err) {
      onlyBool = false
    }

    if(!(gender === 'male' || gender === 'female') ) {
      return reject('error 1')
    }

    if(!(age === '35 år eller yngre' || age === '36-44 år' || age === '45 år eller ældre')) {
      return reject('error 2')
    }

    if(!(onlyBool && answers.length === 10)) {
      return reject('error 3')
    }
    resolve(body)


  }).then(body => {
    return new Promise((resolve,reject) => {
      fs.readFile(`./data/${file}.json`, 'utf8', (err, database) => {
        if(err) reject(err)
        console.log(database)
        database = JSON.parse(database)
        body.id = database.length + 1
        database.push(body)
        io.emit(`update ${file}`, database)
        fs.writeFile(`./data/${file}.json`, JSON.stringify(database, null, 2), 'utf8', (err) => {
          if(err) reject(err)
          resolve()
        })
      })
    })
  }).catch(console.error)
}


http.listen(PORT, function() {
  console.log('Server started on PORT 3000')
})
