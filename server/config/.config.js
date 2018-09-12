

// var suid = require('rand-token').suid
// var token = suid(16)
// const crypto = require('crypto')
// SALT: crypto.randomBytes(Math.ceil(16/2)).toString('hex').slice(0,16)
// 08edaa84899daa7a1e6f9acb6ea89968cd3be7181e28f7f097d011948870b990dfbd2f135f6eb16620bd264fbdb16a16b2de86b914f4de7f0a52657d3d0b17fb
// @azizi.M : pswd

module.exports = {  
    JWT_SECRET: "Qwe%$[rty]*@;wosh1",
    JWT_TOKEN_TIME: 60*60*24*30, // 30 days
    MONGO_HOST: "localhost",
    MONGO_PORT: 27017,
    MONGO_DATABASE: "CDS",
    MONGO_USER: "",
    MONGO_PASS: "",
    HOST: "127.0.0.1",
    PORT: 3000,
    SALT: "f3b2d3ce90dd44fd"
    
}