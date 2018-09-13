


'use strict'

const crypto = require('crypto')

// generating salt(secret)
function genRandomString (length){
    return crypto.randomBytes(length).toString('hex')
}

// hashing method using sha512
function sha512 (password, secret){
    return crypto.pbkdf2Sync(password, secret, 10000, 512, 'sha512').toString('hex')
}

// comapring the db hash with given hash
exports.compare = function (hash, pswd, secret, cb){
    if (cb && typeof(cb) === "function") {
        cb(hash === sha512(pswd, secret))
    }
}

// hashing password
exports.hashMe = function (userpassword) {
    var secret = genRandomString(16)
    var passwordData = sha512(userpassword, secret)
    return {
        hp: passwordData,
        slt: secret
    }
}