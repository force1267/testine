


'use strict'

const crypto = require('crypto')

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
module.exports = function compare(hash, pswd, secret, cb){
    if (cb && typeof(cb) === "function") {
          cb(hash === crypto.createHmac('sha512', secret).update(pswd).digest('hex'))
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