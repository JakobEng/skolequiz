"use strict"
const express = require('express')
const fs = require('fs')
let bodyParser = require('body-parser')

let app = express()

const port = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(bodyParser.json())


app.get('/api', function(req, res) {
  fs.readFile('./database.json', 'utf8', function(err, data) {
    if(err) {
      return res.json({"error": "error geting data from database"})
    }
    //data = JSON.parse(data)
    //data = JSON.stringify(data)
    data = JSON.parse(data)
    res.json(data)
  })
})


app.post('/api', function(req, res) {
  let body = req.body
  fs.readFile('./database.json', 'utf8', function(err, data) {
    if(err) {
      return res.json({"error": "error geting data from database"})
    }
    data = JSON.parse(data)

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
    
    if((gender === 'male' || gender === 'female') && (age === '20 år eller yngre' || age === '21-30 år' || age === '31-40 år' || age === '41-50 år' || age === '51 år eller ældre')
      && onlyBool && answers.length > 1) {
    } else return res.status(400).json({"error": "not valid data"})
    // ...til her
    body.id = data.length
    data.push(body)


    fs.writeFile('./database.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
      if(err) {
        return res.json({"error": "Could not post data"})
      }
      res.json(data)
    })
  })
})


app.listen(port)
