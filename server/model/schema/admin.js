
/* ----------
* Admin Schema
*/

//TODO: use CK-editor for admin bio!
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { 
    type: String, 
    lowercase: true, 
    unique: true, 
    required: true, 
    minlength: 3, 
    maxlength: 10,
    default: ''
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
  bio: {
    type: String,
    default: ''
  },
  lastChange: {
    type: Date, 
    default: Date.now
  }
})

let Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin