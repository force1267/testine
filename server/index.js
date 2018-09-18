
//TODO: add rate-limiter
const db = require('./model/db/db')
const express = require('express')
const cfg = require('./config/.config')
const crypto = require('crypto')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const posts = require('./routes/posts.route')
const auth = require('./routes/auth.route')
const User = require('./model/schema/user')
const jwt = require('jsonwebtoken')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = cfg.HOST || '127.0.0.1'
const port = cfg.PORT || 3000

app.set('port', port)
db.connect()
  
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  }
  else {
    next()
  }
})

// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// app.use('/posts')
app.use('/auth', auth({express, jwt, User, crypto}))

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
