
/* ----------
* Admin Schema
*/

//TODO: use CK-editor for admin bio!
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
    minlength: 3, 
    maxlength: 10,
    default: ''
  },
  activation_token: { // use for changing admin panel url! prevent finding the panel url
    type: String,
    default: function() {
        return token
    }
  },
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
  }
}, {timestamps: true, collection: 'ownerinfo' })

let User = mongoose.model('User',userSchema)
module.exports = User