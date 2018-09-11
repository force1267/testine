
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
  joining: {
    type: Date, 
    default: Date.now
  }
})

// helpers
adminSchema.query.byEmail = function(email, cb) {
  return this.where({ email: email })
}

let Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin