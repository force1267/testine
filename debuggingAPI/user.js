
/* ----------
* Admin Schema
*/

const mongoose = require('mongoose')
const suid = require('rand-token').suid
const token = suid(16)
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: { 
    type: String, 
    lowercase: true, 
    unique: true, 
    required: true,
    default: ''
  },
  activation_token: {
    type: String,
    default: function() {
        return token
    }
  },
  isAdmin: {type: Boolean, default: false},
  avatar: { data: Buffer, type: String, default: '' },
  email: {
    type: String,
    required : true,
    unique : true,
    default: ''
  },
  password: {
    type: String,
    required : true,
  },
  salt: {type: String},
  bio: {
    type: String,
    default: ''
  },
  lastseendate: { type: Date, default: Date.now }
}, {timestamps: true, collection: 'ownerinfo' })

let User = mongoose.model('User',userSchema)
module.exports = User