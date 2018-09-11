
const mongoose = require('mongoose')
const cfg = require('../../config/.config.js')
mongoose.Promise = global.Promise // https://mongoosejs.com/docs/promises.html
const chalk = require('chalk')
var connected = chalk.bold.cyan
var error = chalk.bold.yellow
var disconnected = chalk.bold.red
var termination = chalk.bold.magenta

exports.connect = () => {
        mongoose.connect('mongodb://' + cfg.MONGO_HOST + ':' + cfg.MONGO_PORT + '/' + cfg.MONGO_DATABASE, {
        user: cfg.MONGO_USER,
        pass: cfg.MONGO_PASS,
        useNewUrlParser: true
      })
      
      /*
      * CONNECTION EVENTS
      */
      
      // When successfully connected
      mongoose.connection.on('connected', () => {
        console.log(connected('\nMongoose default connection is open to ', cfg.MONGO_HOST))
      })
      // If the connection throws an error
      mongoose.connection.on('error', (err) => {
        console.log(error('\nMongoose default connection has occured ' + err + ' error'))
      })
      // When the connection is disconnected
      mongoose.connection.on('disconnected', () => {
        console.log(disconnected('\nMongoose default connection is disconnected'))
      })
      // If the Node process ends, close the Mongoose connection
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log(termination('\nMongoose default connection is disconnected due to application termination'))
          process.exit(0)
        })
      })
}