


'use strict'

const crypto = require('crypto')
const cfg = require('../config/.config')

// generating salt(secret)
module.exports = function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length)
}

// hashing method using sha512
module.exports = function sha512(password, secret){
    var hash = crypto.createHmac('sha512', secret)
    hash.update(password)
    var value = hash.digest('hex')
    return value
}

// comapring the hash with given password
module.exports = function compare(hash, pswd, cb){
    if (cb && typeof(cb) === "function") {
          cb(hash === crypto.createHmac('sha512', cfg.SALT).update(pswd).digest('base64'))
    }
}

// hashing password
module.exports = function saltHashPassword(userpassword) {
    var secret = genRandomString(16)
    var passwordData = sha512(userpassword, secret)
    return {
        hp: passwordData,
        slt: secret
    }
}