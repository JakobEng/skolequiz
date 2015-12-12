"use strict"
const express = require('express')

let app = express()

const port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.send('Working')
})

app.listen(port)
