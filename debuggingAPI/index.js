

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cfg = require('./.config')
const route = require('./route')
const User = require('./user')
const Post = require('./post')
const Comments = require('./comment')
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


app.use('/route', route({express, User, Post, Comments}))

app.listen(5430, 'localhost')
console.log('Server listening ...')

mongoose.connect('mongodb://cluster0-shard-00-00-ph4su.mongodb.net:27017,cluster0-shard-00-01-ph4su.mongodb.net:27017,cluster0-shard-00-02-ph4su.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
user: 'force',
pass: '12672551',
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