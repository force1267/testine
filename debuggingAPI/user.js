
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
  activation_token: { // use for admin panel url! it'll not allow to find the panel easily
    type: String,
    default: function() {
        return token
    }
  },
  avatar: { data: Buffer, contentType: String },
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