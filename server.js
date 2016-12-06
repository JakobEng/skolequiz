"use strict"
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

let app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000

let database = require('./database.json')

app.use(express.static('./public'))
app.use(bodyParser.json())

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('update mode', database)
  socket.on('post mode', (body) => {

    // Tjekker om data er gyldig fra her...
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
      return res.status(400).json({"error": "not valid gender"})
    }

    if(!(age === '35 år eller yngre' || age === '36-44 år' || age === '45 år eller ældre')) {
      return res.status(400).json({"error": "not valid age"})
    }

    if(!(onlyBool && answers.length === 10)) {
      return res.status(400).json({"error": "not valid answers"})
    }
    // ...til her
    database = JSON.parse(database)
    body.id = database.length + 1
    database.push(body)
    database = JSON.strinify(database)
    io.emit('update mode', database)

  })
})


app.get('/api', function(req, res) {
  fs.readFile('./database.json', 'utf8', function(err, data) {
    if(err) {
      return res.json({"error": "error geting data from database"})
    }

    res.json(JSON.parse(data))
  })
})


// app.post('/api', function(req, res) {
//   let body = req.body
//   fs.readFile('./database.json', 'utf8', function(err, data) {
//     if(err) {
//       return res.json({"error": "error geting data from database"})
//     }
//     data = JSON.parse(data)
//
//     // Tjekker om data er gyldig fra her...
//     let gender = body.gender
//     let age = body.age
//     let answers = body.answers
//     let onlyBool;
//
//     try {
//       answers.forEach((answer) => {if(typeof answer !== 'boolean') onlyBool = false})
//       if(typeof onlyBool === 'undefined') {onlyBool = true}
//     } catch(err) {
//       onlyBool = false
//     }
//
//     if(!(gender === 'male' || gender === 'female') ) {
//       return res.status(400).json({"error": "not valid gender"})
//     }
//
//     if(!(age === '35 år eller yngre' || age === '36-44 år' || age === '45 år eller ældre')) {
//       return res.status(400).json({"error": "not valid age"})
//     }
//
//     if(!(onlyBool && answers.length === 10)) {
//       return res.status(400).json({"error": "not valid answers"})
//     }
//     // ...til her
//     body.id = data.length + 1
//     data.push(body)
//
//
//     fs.writeFile('./database.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
//       if(err) {
//         return res.json({"error": "Could not post data"})
//       }
//       res.json(data)
//     })
//   })
// })


app.get('/resultat', function(req, res) {
  res.sendFile(__dirname + '/public/resultat/index.html')
})


http.listen(PORT, function() {
  console.log('Server started on PORT 3000')
})
