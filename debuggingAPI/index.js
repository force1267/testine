

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cfg = require('./.config')
const auth = require('./auth')
const User = require('./user')
const chalk = require('chalk')
const cors = require('cors')
var connected = chalk.bold.cyan
var error = chalk.bold.yellow
var disconnected = chalk.bold.red
var termination = chalk.bold.magenta

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/auth', auth({express, User}))

app.listen(4000, 'localhost')
console.log('Server listening ...')

mongoose.connect('mongodb://' + cfg.MONGO_HOST + ':' + cfg.MONGO_PORT + '/' + cfg.MONGO_DATABASE, {
user: cfg.MONGO_USER,
pass: cfg.MONGO_PASS,
useNewUrlParser: true
})

/*
* CONNECTION EVENTS
*/

// When successfully connected
mongoose.connection.on('connected', function() {
console.log(connected('\nMongoose default connection is open to ', cfg.MONGO_HOST))
})
// If the connection throws an error
mongoose.connection.on('error', function(err) {
console.log(error('\nMongoose default connection has occured ' + err + ' error'))
})
// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
console.log(disconnected('\nMongoose default connection is disconnected'))
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
mongoose.connection.close(function() {
    console.log(termination('\nMongoose default connection is disconnected due to application termination'))
    process.exit(0)
})
})